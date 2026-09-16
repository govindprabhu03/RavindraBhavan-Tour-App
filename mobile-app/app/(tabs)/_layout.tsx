import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { colors, typography } from '../../src/theme/theme';
import { TourIcon, AboutIcon, GalleryIcon, EventsIcon, BookIcon } from '../../src/components/TabIcons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.inkMuted,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Tour', tabBarIcon: ({ color }) => <TourIcon color={color} /> }}
      />
      <Tabs.Screen
        name="about"
        options={{ title: 'About', tabBarIcon: ({ color }) => <AboutIcon color={color} /> }}
      />
      <Tabs.Screen
        name="gallery"
        options={{ title: 'Gallery', tabBarIcon: ({ color }) => <GalleryIcon color={color} /> }}
      />
      <Tabs.Screen
        name="events"
        options={{ title: 'Events', tabBarIcon: ({ color }) => <EventsIcon color={color} /> }}
      />
      <Tabs.Screen
        name="contact"
        options={{ title: 'Book', tabBarIcon: ({ color }) => <BookIcon color={color} /> }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.divider,
    height: 68,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabLabel: {
    fontFamily: typography.bodyMedium,
    fontSize: 10.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 2,
  },
});
