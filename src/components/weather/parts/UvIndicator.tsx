import type { UvLevel } from "@/types/uv";
import { UV_DISPLAY } from "@/constants/uv";

type Props = {
  level: UvLevel;
};

export function UvIndicator({ level }: Props) {
  const { label, color } = UV_DISPLAY[level];

  return (
    <div className="uv-indicator">
      <span
        className="uv-square"
        style={{ background: color }}
      />
      <span className="uv-label">{label}</span>
    </div>
  );
}