"use client";

import { useEffect, useRef } from "react";

// A solid extruded W rendered as lit ASCII text in a <pre>, like a tiny
// software rasteriser: sample the surface, rotate, project, z-buffer, shade.

const RAMP = ".,-~:;=!*#$@";
const CELL_WIDTH = 0.6; // JetBrains Mono advance width per em
const CAMERA_DISTANCE = 5;
const FRAME_MS = 40; // ~25 fps
const ASSEMBLE_MS = 1400;
const IDLE_SPIN = 0.9; // rad/s
const BASE_TILT = 0.38; // rad around x

type AsciiWProps = {
  /** Maximum box width in px; the box shrinks with its container. */
  width?: number;
  /** Maximum box height in px; scales with the width. */
  height?: number;
  fontSize?: number;
  /** Cells appear over ~1.4 s as random ramp characters before settling. */
  assemble?: boolean;
  /** Cursor tilt and drag-to-spin with momentum. */
  interactive?: boolean;
  /** Multiplier for the idle spin. */
  speed?: number;
  /** When false, nothing is drawn yet; flipping it to true starts the W. */
  start?: boolean;
  /** Accessible label; without one the W is decorative (aria-hidden). */
  label?: string;
  className?: string;
};

function buildPoints(step: number) {
  const k = 0.9;
  const hw = 0.13;
  const depth = 0.22;
  const path = [[-1.2, 0.9], [-0.6, -0.9], [0, 0.45], [0.6, -0.9], [1.2, 0.9]];
  const pts: number[] = [];
  for (let i = 0; i < 4; i++) {
    const x0 = path[i][0] * k, y0 = path[i][1] * k;
    const x1 = path[i + 1][0] * k, y1 = path[i + 1][1] * k;
    let dx = x1 - x0, dy = y1 - y0;
    const len = Math.hypot(dx, dy);
    dx /= len; dy /= len;
    const nx = -dy, ny = dx;
    for (let a = -0.05; a <= len + 0.05; a += step) {
      const cx = x0 + dx * a, cy = y0 + dy * a;
      // Front and back faces.
      for (let b = -hw; b <= hw; b += step) {
        pts.push(cx + nx * b, cy + ny * b, -depth, 0, 0, -1);
        pts.push(cx + nx * b, cy + ny * b, depth, 0, 0, 1);
      }
      // Both sides of the bar.
      for (let z = -depth; z <= depth; z += step) {
        pts.push(cx + nx * hw, cy + ny * hw, z, nx, ny, 0);
        pts.push(cx - nx * hw, cy - ny * hw, z, -nx, -ny, 0);
      }
    }
  }
  return new Float32Array(pts);
}

function hash(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function AsciiW({
  width = 520,
  height = 400,
  fontSize = 10,
  assemble = false,
  interactive = true,
  speed = 1,
  start = true,
  label,
  className,
}: AsciiWProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const pre = preRef.current;
    if (!box || !pre || !start) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canInteract = interactive && !reduce;

    let cols = 0, rows = 0, scale = 1;
    const aspect = 1 / CELL_WIDTH; // cell height / width, ~1.67
    let zbuf = new Float32Array(0);
    let lum = new Float32Array(0);
    let pts = new Float32Array(0);

    let yaw = 0.5, vel = 0;
    let tiltX = 0, tiltY = 0, targetX = 0, targetY = 0;
    let dragging = false, lastX = 0;
    let startTime = performance.now();
    let last = startTime;
    let timer: number | undefined;
    let visible = true;

    function layout() {
      const w = box!.clientWidth, h = box!.clientHeight;
      cols = Math.max(1, Math.floor(w / (fontSize * CELL_WIDTH)));
      rows = Math.max(1, Math.floor(h / fontSize));
      scale = 0.9 * Math.min(cols / (2 * 0.37 * aspect), rows / (2 * 0.38));
      zbuf = new Float32Array(cols * rows);
      lum = new Float32Array(cols * rows);
      const step = Math.min(2 / (scale * aspect), 2.5 / scale, 0.05);
      pts = buildPoints(step);
    }

    function draw(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!dragging && !reduce) {
        yaw += IDLE_SPIN * speed * dt + vel;
        vel *= 0.94;
      }
      tiltX += (targetX - tiltX) * 0.08;
      tiltY += (targetY - tiltY) * 0.08;

      const pitch = BASE_TILT + tiltY;
      const ry = yaw + tiltX;
      const cY = Math.cos(ry), sY = Math.sin(ry);
      const cP = Math.cos(pitch), sP = Math.sin(pitch);
      const hx = cols / 2, hy = rows / 2;
      zbuf.fill(0);
      lum.fill(-1);

      for (let p = 0; p < pts.length; p += 6) {
        const x = pts[p], y = pts[p + 1], z = pts[p + 2];
        // Rotate around y, then tilt around x.
        const x1 = x * cY + z * sY, z1 = -x * sY + z * cY;
        const y2 = y * cP - z1 * sP, z2 = y * sP + z1 * cP;
        const ooz = 1 / (z2 + CAMERA_DISTANCE);
        const px = (hx + scale * x1 * ooz * aspect) | 0;
        const py = (hy - scale * y2 * ooz) | 0;
        if (px < 0 || px >= cols || py < 0 || py >= rows) continue;
        const i = px + py * cols;
        if (ooz <= zbuf[i]) continue;
        zbuf[i] = ooz;
        const nx = pts[p + 3], ny = pts[p + 4], nz = pts[p + 5];
        const nz1 = -nx * sY + nz * cY;
        const ny2 = ny * cP - nz1 * sP, nz2 = ny * sP + nz1 * cP;
        // Single light: L = n · (0, 0.7071, -0.7071).
        const l = ny2 * 0.7071 - nz2 * 0.7071;
        lum[i] = l > 0 ? Math.min(1, l) : 0;
      }

      const progress = assemble && !reduce ? Math.min(1, (now - startTime) / ASSEMBLE_MS) : 1;
      const R = RAMP.length;
      let out = "";
      for (let r = 0; r < rows; r++) {
        for (let q = 0; q < cols; q++) {
          const j = q + r * cols;
          const l = lum[j];
          let ch = " ";
          if (l >= 0) {
            ch = l > 0 ? RAMP[Math.min(R - 1, Math.floor(l * R))] : ".";
            if (progress < 1) {
              const h = hash(j);
              if (h > progress + 0.25) ch = " ";
              else if (h > progress) ch = RAMP[(Math.random() * R) | 0];
            }
          }
          out += ch;
        }
        if (r < rows - 1) out += "\n";
      }
      pre!.textContent = out;
    }

    function tick() {
      draw(performance.now());
    }

    function run() {
      if (reduce || timer !== undefined || !visible || document.hidden) return;
      last = performance.now();
      timer = window.setInterval(tick, FRAME_MS);
    }

    function stop() {
      if (timer !== undefined) window.clearInterval(timer);
      timer = undefined;
    }

    layout();
    startTime = performance.now();
    draw(startTime);
    run();

    const resize = new ResizeObserver(() => {
      const c = Math.floor(box.clientWidth / (fontSize * CELL_WIDTH));
      const r = Math.floor(box.clientHeight / fontSize);
      if (c === cols && r === rows) return;
      layout();
      draw(performance.now());
    });
    resize.observe(box);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) run();
      else stop();
    });
    io.observe(box);

    const onVisibility = () => (document.hidden ? stop() : run());
    document.addEventListener("visibilitychange", onVisibility);

    const onMove = (e: PointerEvent) => {
      const rect = box.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetX = nx * 0.45;
      targetY = ny * 0.3;
      if (dragging) {
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        yaw += dx * 0.012;
        vel = dx * 0.012;
      }
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      try { box.setPointerCapture(e.pointerId); } catch { /* not capturable */ }
    };
    const onUp = () => { dragging = false; };
    const onLeave = () => { targetX = 0; targetY = 0; dragging = false; };

    if (canInteract) {
      box.addEventListener("pointermove", onMove);
      box.addEventListener("pointerdown", onDown);
      box.addEventListener("pointerup", onUp);
      box.addEventListener("pointercancel", onUp);
      box.addEventListener("pointerleave", onLeave);
    }

    return () => {
      stop();
      resize.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerdown", onDown);
      box.removeEventListener("pointerup", onUp);
      box.removeEventListener("pointercancel", onUp);
      box.removeEventListener("pointerleave", onLeave);
    };
  }, [start, assemble, interactive, speed, fontSize]);

  return (
    <div
      ref={boxRef}
      className={`ascii-w${interactive ? " ascii-w-interactive" : ""}${className ? ` ${className}` : ""}`}
      style={{ width: `min(100%, ${width}px)`, aspectRatio: `${width} / ${height}` }}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <pre ref={preRef} style={{ fontSize, lineHeight: `${fontSize}px` }} />
    </div>
  );
}
