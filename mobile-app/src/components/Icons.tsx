import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

type Props = { color: string; size?: number };

export function AuditoriumIcon({ color, size = 18 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path d="M2 15V8.5C2 5 5 2.2 9 2.2S16 5 16 8.5V15" stroke={color} strokeWidth={1.4} />
      <Path d="M1 15h16" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

export function TheatreIcon({ color, size = 18 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path d="M2 5l7-3 7 3" stroke={color} strokeWidth={1.4} strokeLinejoin="round" />
      <Path d="M3 5v8.5c2 1.2 4 1.8 6 1.8s4-.6 6-1.8V5" stroke={color} strokeWidth={1.4} />
    </Svg>
  );
}

export function LibraryIcon({ color, size = 18 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path d="M3 3.5h4.5v11.5H3z" stroke={color} strokeWidth={1.3} />
      <Path d="M9.2 3.5H14v11.5H9.2z" stroke={color} strokeWidth={1.3} />
    </Svg>
  );
}

export function ParkingIcon({ color, size = 18 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Rect x={2.5} y={2.5} width={13} height={13} rx={2} stroke={color} strokeWidth={1.3} />
      <Path d="M7 13V5.3h2.6a2.2 2.2 0 1 1 0 4.4H7" stroke={color} strokeWidth={1.3} />
    </Svg>
  );
}

export function ExhibitionIcon({ color, size = 18 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Rect x={2.3} y={3.5} width={13.4} height={10} rx={1} stroke={color} strokeWidth={1.3} />
      <Path d="M2.3 11l3.6-3.6 2.7 2.4 3-3.4 3.4 4.6" stroke={color} strokeWidth={1.3} strokeLinejoin="round" />
    </Svg>
  );
}

export function SnacksIcon({ color, size = 18 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path d="M4 6.5h10l-1 8.5H5L4 6.5Z" stroke={color} strokeWidth={1.3} strokeLinejoin="round" />
      <Path d="M6.5 6.5a2.5 2.5 0 0 1 5 0" stroke={color} strokeWidth={1.3} />
    </Svg>
  );
}

export function TrainingIcon({ color, size = 18 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Circle cx={9} cy={5.3} r={2.3} stroke={color} strokeWidth={1.3} />
      <Path d="M3.5 15c0-3.2 2.5-5 5.5-5s5.5 1.8 5.5 5" stroke={color} strokeWidth={1.3} />
    </Svg>
  );
}

export function ServiceIcon({ color, size = 18 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Circle cx={9} cy={9} r={2.6} stroke={color} strokeWidth={1.3} />
      <Path
        d="M9 2.3v2M9 13.7v2M2.3 9h2M13.7 9h2M4.3 4.3l1.4 1.4M12.3 12.3l1.4 1.4M13.7 4.3l-1.4 1.4M5.7 12.3l-1.4 1.4"
        stroke={color}
        strokeWidth={1.3}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function PinIcon({ color, size = 20 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 18s6-5.7 6-10.2A6 6 0 0 0 4 7.8C4 12.3 10 18 10 18Z"
        stroke={color}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <Circle cx={10} cy={7.8} r={2.1} stroke={color} strokeWidth={1.4} />
    </Svg>
  );
}

export function PhoneIcon({ color, size = 20 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M4.5 3.5h3l1.3 3.5-1.8 1.3a9 9 0 0 0 4.3 4.3l1.3-1.8 3.5 1.3v3a1.3 1.3 0 0 1-1.4 1.3C8.7 15.6 4.4 11.3 3.7 5.9a1.3 1.3 0 0 1 1.3-1.4Z"
        stroke={color}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function MailIcon({ color, size = 20 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Rect x={2.5} y={4.5} width={15} height={11} rx={1.4} stroke={color} strokeWidth={1.4} />
      <Path d="M3 5.5l7 5.5 7-5.5" stroke={color} strokeWidth={1.4} strokeLinejoin="round" />
    </Svg>
  );
}
