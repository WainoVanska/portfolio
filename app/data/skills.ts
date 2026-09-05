export type Skill = {
  name: string;
  label: string;
  icon?: string;
  wordmark?: string;
  wide?: boolean;
};

export const skills: readonly Skill[] = [
  { name: "Scala", icon: "/skills/scala.svg", label: "Scala 3" },
  { name: "C", icon: "/skills/c.svg", label: "C17" },
  { name: "Python", icon: "/skills/python.svg", label: "Python 3" },
  { name: "C++", icon: "/skills/cplusplus.svg", label: "C++17" },
  { name: "Figma", icon: "/skills/figma.svg", label: "Figma" },
  { name: "Unity", icon: "/skills/unity.svg", label: "Unity" },
  { name: "GLSL", wordmark: "GLSL", label: "GLSL 330" },
  {
    name: "OpenGL",
    icon: "/skills/opengl.svg",
    label: "OpenGL 3.3 Core",
    wide: true,
  },
];
