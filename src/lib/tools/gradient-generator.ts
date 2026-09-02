export interface GradientStop {
  color: string;
  position: number;
}

export interface CSSGradientConfig {
  type: "linear" | "radial";
  shape?: "circle" | "ellipse";
  angle: number;
  stops: GradientStop[];
}

export function generateCSSGradient(config: CSSGradientConfig): string {
  const stopsStr = config.stops
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ");

  if (config.type === "linear") {
    return `linear-gradient(${config.angle}deg, ${stopsStr})`;
  }
  const shape = config.shape || "circle";
  return `radial-gradient(${shape}, ${stopsStr})`;
}

export function generateDefaultGradientConfig(): CSSGradientConfig {
  return {
    type: "linear",
    angle: 45,
    stops: [
      { color: "#ff6b6b", position: 0 },
      { color: "#4ecdc4", position: 50 },
      { color: "#45b7d1", position: 100 },
    ],
  };
}
