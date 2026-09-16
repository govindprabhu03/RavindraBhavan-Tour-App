import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  Extrapolation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/theme';
import { SceneCaption } from './SceneCaption';
import { ScrollHint } from './ScrollHint';
import type { TourScene } from '../data/venue';

type Props = {
  scenes: TourScene[];
  onReachEnd?: () => void;
};

// Each scene owns one full screen-height of scroll travel. Scrolling through
// that band crossfades + gently zooms into the next photo, and its caption
// fades/parallaxes with it — the same "scrub a frame sequence by scrolling"
// mechanic as a web video-scrub hero, built on real venue photos instead of
// extracted video frames (see ScrollScrubVideoStage for the video-seek variant).
export function ScrollScrubStage({ scenes, onReachEnd }: Props) {
  const { height, width } = useWindowDimensions();
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]}>
        {scenes.map((scene, index) => (
          <SceneLayer key={scene.id} scene={scene} index={index} scrollY={scrollY} height={height} width={width} />
        ))}
        <ScrollHint scrollY={scrollY} height={height} />
      </View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={StyleSheet.absoluteFill}
        contentContainerStyle={{ height: height * scenes.length + height * 0.6 }}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          if (e.nativeEvent.contentOffset.y > height * (scenes.length - 1) + height * 0.3) {
            onReachEnd?.();
          }
        }}
      />
    </View>
  );
}

function SceneLayer({
  scene,
  index,
  scrollY,
  height,
  width,
}: {
  scene: TourScene;
  index: number;
  scrollY: Animated.SharedValue<number>;
  height: number;
  width: number;
}) {
  const bandStart = (index - 1) * height;
  const bandCenter = index * height;
  const bandEnd = (index + 1) * height;

  const imageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [bandStart, bandCenter, bandEnd],
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      scrollY.value,
      [bandStart, bandCenter, bandEnd],
      [1.12, 1.0, 0.94],
      Extrapolation.CLAMP
    );
    return { opacity, transform: [{ scale }] };
  });

  return (
    <Animated.View style={[StyleSheet.absoluteFill, imageStyle]}>
      <Animated.Image source={scene.image} style={{ width, height }} resizeMode="cover" />
      <LinearGradient
        colors={['rgba(11,10,8,0.15)', 'rgba(11,10,8,0.05)', 'rgba(11,10,8,0.75)']}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />
      <SceneCaption scene={scene} index={index} scrollY={scrollY} height={height} />
    </Animated.View>
  );
}
