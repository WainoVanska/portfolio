"use client";

import { useEffect, useState, type CSSProperties } from "react";

const ROW_COUNT = 20;
const COLUMN_COUNT = 156;

function seededUnit(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function createRow(rowIndex: number) {
  return Array.from({ length: COLUMN_COUNT }, (_, columnIndex) =>
    seededUnit(rowIndex * 173 + columnIndex * 29 + 11) > 0.5 ? "1" : "0",
  ).join("");
}

function formatRow(row: string) {
  return row.match(/.{1,8}/g)?.join("  ") ?? row;
}

const INITIAL_ROWS = Array.from({ length: ROW_COUNT }, (_, index) =>
  createRow(index),
);

const ROW_STYLES = Array.from({ length: ROW_COUNT }, (_, index) => ({
  left: `${-12 + seededUnit(index * 47 + 3) * 13}%`,
  top: `${2 + (index * 96) / (ROW_COUNT - 1)}%`,
  opacity: 0.045 + seededUnit(index * 61 + 7) * 0.075,
})) satisfies CSSProperties[];

export function BinaryField() {
  const [rows, setRows] = useState(INITIAL_ROWS);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let timer: number;

    const flipBits = () => {
      if (!document.hidden) {
        setRows((currentRows) => {
          const nextRows = [...currentRows];
          const flips = 12 + Math.floor(Math.random() * 10);

          for (let index = 0; index < flips; index += 1) {
            const rowIndex = Math.floor(Math.random() * ROW_COUNT);
            const columnIndex = Math.floor(Math.random() * COLUMN_COUNT);
            const row = nextRows[rowIndex].split("");
            row[columnIndex] = row[columnIndex] === "0" ? "1" : "0";
            nextRows[rowIndex] = row.join("");
          }

          return nextRows;
        });
      }

      timer = window.setTimeout(flipBits, 650 + Math.random() * 550);
    };

    timer = window.setTimeout(flipBits, 750);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="binary-field" aria-hidden="true">
      {rows.map((row, index) => (
        <span className="binary-row" style={ROW_STYLES[index]} key={index}>
          {formatRow(row)}
        </span>
      ))}
    </div>
  );
}
