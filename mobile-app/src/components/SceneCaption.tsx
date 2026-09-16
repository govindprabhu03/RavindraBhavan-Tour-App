import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, Extrapolation } from 'react-native-reanimated';
import { colors, typography } from '../theme/theme';
import type { TourScene } from '../data/venue';

type Props = {
  scene: TourScene;
  index: number;
  scrollY: Animated.SharedValue<number>;
  height: number;
};

// Fades + gently parallaxes a scene's caption block in/out as scrollY passes
// through its band [index-1, index, index+1] * height. Shared between the
// photo-crossfade stage and the video-seek stage so both scrub mechanics read
// as the same experience.
export function SceneCaption({ scene, index, scrollY, height }: Props) {
  const bandStart = (index - 1) * height;
  const bandCenter = index * height;
  const bandEnd = (index + 1) * height;

  const textStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [bandCenter - height * 0.35, bandCenter - height * 0.1, bandCenter + height * 0.25, bandCenter + height * 0.4],
      [0, 1, 1, 0],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [bandStart, bandCenter, bandEnd],
      [24, 0, -24],
      Extrapolation.CLAMP
    );
    return { opacity, transform: [{ translateY }] };
  });

  return (
    <Animated.View style={[styles.captionBlock, textStyle, { pointerEvents: 'none' }]}>
      <View style={styles.rule} />
      <Animated.Text style={styles.eyebrow}>{scene.eyebrow}</Animated.Text>
      <Animated.Text style={styles.title}>{scene.title}</Animated.Text>
      <Animated.Text style={styles.caption}>{scene.caption}</Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  captionBlock: {
    position: 'absolute',
    left: 28,
    right: 28,
    bottom: 72,
  },
  rule: {
    width: 40,
    height: 2,
    backgroundColor: colors.gold,
    marginBottom: 14,
  },
  eyebrow: {
    fontFamily: typography.bodyMedium,
    color: colors.gold,
    fontSize: 14,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontFamily: typography.display,
    color: colors.ink,
    fontSize: 34,
    marginBottom: 10,
  },
  caption: {
    fontFamily: typography.body,
    color: colors.inkMuted,
    fontSize: 17,
    lineHeight: 24,
    maxWidth: 320,
  },
});
