import React from "react";
import Svg, { Path, Circle, Rect } from "react-native-svg";

type Props = { color: string; size?: number };

// Line-icon set matching the redesign — replaces Expo Router's default
// chevron fallback icons with marks drawn from the venue's own vocabulary
// (the Tour icon echoes the building's dome silhouette).
export function TourIcon({ color, size = 21 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path d="M4 13.5C4 8.8 7.5 5 11 5s7 3.8 7 8.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M2.5 13.5h17" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M11 5v-1.6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function AboutIcon({ color, size = 21 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Circle cx={11} cy={11} r={8} stroke={color} strokeWidth={1.4} />
      <Path d="M11 10v5.2" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Circle cx={11} cy={7.3} r={1} fill={color} />
    </Svg>
  );
}

export function GalleryIcon({ color, size = 21 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Rect x={3.5} y={3.5} width={6.4} height={6.4} rx={0.8} stroke={color} strokeWidth={1.4} />
      <Rect x={12.1} y={3.5} width={6.4} height={6.4} rx={0.8} stroke={color} strokeWidth={1.4} />
      <Rect x={3.5} y={12.1} width={6.4} height={6.4} rx={0.8} stroke={color} strokeWidth={1.4} />
      <Rect x={12.1} y={12.1} width={6.4} height={6.4} rx={0.8} stroke={color} strokeWidth={1.4} />
    </Svg>
  );
}

export function EventsIcon({ color, size = 21 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Rect x={3.5} y={4.5} width={15} height={14} rx={1.4} stroke={color} strokeWidth={1.4} />
      <Path d="M3.5 8.5h15" stroke={color} strokeWidth={1.4} />
      <Path d="M7 3v3M15 3v3" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

export function BookIcon({ color, size = 21 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        d="M5 4h3.2l1.6 4-2 1.4a10 10 0 0 0 4.8 4.8l1.4-2 4 1.6V17a1.5 1.5 0 0 1-1.6 1.5C9.8 17.9 4.1 12.2 3.5 5.6A1.5 1.5 0 0 1 5 4Z"
        stroke={color}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
