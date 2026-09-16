import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SystemUI from 'expo-system-ui';
import { useFonts, PlayfairDisplay_600SemiBold, PlayfairDisplay_500Medium_Italic } from '@expo-google-fonts/playfair-display';
import { Cormorant_400Regular, Cormorant_600SemiBold } from '@expo-google-fonts/cormorant';
import { colors } from '../src/theme/theme';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_500Medium_Italic,
    Cormorant_400Regular,
    Cormorant_600SemiBold,
  });

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}
