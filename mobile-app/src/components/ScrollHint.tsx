import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  Extrapolation,
} from 'react-native-reanimated';
import { colors, typography } from '../theme/theme';

type Props = {
  scrollY: Animated.SharedValue<number>;
  height: number;
};

// A small "scroll to explore" affordance, visible only at the very top of the
// tour and fading out as soon as the user starts scrolling — tells first-time
// visitors the screen responds to scroll, not taps.
export function ScrollHint({ scrollY, height }: Props) {
  const bounce = useSharedValue(0);

  useEffect(() => {
    bounce.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 900, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 900, easing: Easing.inOut(Easing.quad) })
      ),
      -1
    );
  }, [bounce]);

  const style = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, height * 0.15], [1, 0], Extrapolation.CLAMP);
    const translateY = interpolate(bounce.value, [0, 1], [0, 10]);
    return { opacity, transform: [{ translateY }] };
  });

  return (
    <Animated.View style={[styles.container, style]} pointerEvents="none">
      <Text style={styles.label}>Scroll to Explore</Text>
      <Text style={styles.chevron}>⌄</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  label: {
    fontFamily: typography.bodyMedium,
    color: colors.inkMuted,
    fontSize: 12,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  chevron: {
    color: colors.gold,
    fontSize: 22,
    lineHeight: 22,
  },
});
