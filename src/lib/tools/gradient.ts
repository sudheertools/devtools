export interface GradientConfig {
  type: "linear" | "radial";
  angle: number;
  colors: { color: string; position: number }[];
}

export function generateGradient(config: GradientConfig): string {
  const colorStops = config.colors
    .map((c) => `${c.color} ${c.position}%`)
    .join(", ");

  if (config.type === "linear") {
    return `linear-gradient(${config.angle}deg, ${colorStops})`;
  }
  return `radial-gradient(circle, ${colorStops})`;
}

export function generateDefaultGradient(): GradientConfig {
  return {
    type: "linear",
    angle: 90,
    colors: [
      { color: "#667eea", position: 0 },
      { color: "#764ba2", position: 100 },
    ],
  };
}
