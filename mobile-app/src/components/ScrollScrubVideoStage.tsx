import React, { useEffect, useRef } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useDerivedValue,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { useVideoPlayer, VideoView } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/theme';
import { SceneCaption } from './SceneCaption';
import { ScrollHint } from './ScrollHint';
import type { TourScene } from '../data/venue';

type Props = {
  /** require(...) result for the composed Ken Burns tour video */
  videoSource: number;
  /** captions shown per scene, in the order they appear in the video — one screen-height of scroll each */
  scenes: TourScene[];
  onReachEnd?: () => void;
};

// Native equivalent of the web "scrub a frame sequence on scroll" trick.
// Instead of preloading hundreds of 4K frame images (which would blow past
// mobile memory budgets), this seeks a single compressed video's playhead to
// match scroll position — same felt effect, a fraction of the footprint.
export function ScrollScrubVideoStage({ videoSource, scenes, onReachEnd }: Props) {
  const { height, width } = useWindowDimensions();
  const scrollLengthInScreens = scenes.length;
  const player = useVideoPlayer(videoSource, (p) => {
    p.muted = true;
    p.loop = false;
    p.pause();
  });

  const durationRef = useRef(0);
  useEffect(() => {
    const sub = player.addListener('statusChange', ({ status }) => {
      if (status === 'readyToPlay') {
        durationRef.current = player.duration ?? 0;
      }
    });
    return () => sub.remove();
  }, [player]);

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const progress = useDerivedValue(() => {
    const maxScroll = height * scrollLengthInScreens;
    return Math.min(Math.max(scrollY.value / maxScroll, 0), 1);
  });

  useAnimatedReaction(
    () => progress.value,
    (currentProgress) => {
      // durationRef is a plain JS ref, so it can only be read on the JS
      // thread — pass the raw progress through and resolve duration inside
      // the runOnJS'd function rather than in this UI-thread worklet.
      runOnJS(seekToProgress)(player, durationRef, currentProgress);
    }
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]}>
        <VideoView player={player} style={{ width, height }} contentFit="cover" nativeControls={false} />
        <LinearGradient
          colors={['rgba(11,10,8,0.15)', 'rgba(11,10,8,0.05)', 'rgba(11,10,8,0.75)']}
          locations={[0, 0.45, 1]}
          style={StyleSheet.absoluteFill}
        />
        {scenes.map((scene, index) => (
          <SceneCaption key={scene.id} scene={scene} index={index} scrollY={scrollY} height={height} />
        ))}
        <ScrollHint scrollY={scrollY} height={height} />
      </View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={StyleSheet.absoluteFill}
        contentContainerStyle={{ height: height * scrollLengthInScreens + height * 0.6 }}
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

// Throttling note: for a real 4K source, debounce/step this (e.g. only seek
// when targetTime moved > 1 frame) rather than seeking on every onScroll tick,
// to avoid overwhelming the decoder on lower-end Android devices.
function seekToProgress(
  player: ReturnType<typeof useVideoPlayer>,
  durationRef: React.MutableRefObject<number>,
  progress: number
) {
  const duration = durationRef.current;
  if (!duration) return;
  try {
    player.currentTime = progress * duration;
  } catch {
    // player not ready yet
  }
}
