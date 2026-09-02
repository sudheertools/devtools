export interface BoxShadowConfig {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

export function generateBoxShadow(config: BoxShadowConfig): string {
  const inset = config.inset ? "inset " : "";
  return `${inset}${config.offsetX}px ${config.offsetY}px ${config.blur}px ${config.spread}px ${config.color}`;
}

export function generateDefaultBoxShadow(): BoxShadowConfig {
  return {
    offsetX: 0,
    offsetY: 4,
    blur: 6,
    spread: -1,
    color: "rgba(0,0,0,0.1)",
    inset: false,
  };
}
