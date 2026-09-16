import { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '../../src/theme/theme';

type Category = 'All' | 'Exterior' | 'Venue' | 'Events';

const photos: { source: number; category: Exclude<Category, 'All'> }[] = [
  { source: require('../../assets/gallery-grid/g01.jpg'), category: 'Exterior' },
  { source: require('../../assets/gallery-grid/g02.jpg'), category: 'Exterior' },
  { source: require('../../assets/gallery-grid/g03.jpg'), category: 'Venue' },
  { source: require('../../assets/gallery-grid/g05.jpg'), category: 'Venue' },
  { source: require('../../assets/gallery-grid/g06.jpg'), category: 'Venue' },
  { source: require('../../assets/gallery-grid/g04.jpg'), category: 'Events' },
  { source: require('../../assets/gallery-grid/g07.jpg'), category: 'Events' },
  { source: require('../../assets/gallery-grid/g08.jpg'), category: 'Events' },
  { source: require('../../assets/gallery-grid/g09.jpg'), category: 'Events' },
  { source: require('../../assets/gallery-grid/g10.jpg'), category: 'Events' },
  { source: require('../../assets/gallery-grid/g11.jpg'), category: 'Events' },
  { source: require('../../assets/gallery-grid/g12.jpg'), category: 'Events' },
];

const CATEGORIES: Category[] = ['All', 'Exterior', 'Venue', 'Events'];
const GAP = 4;
const COLUMNS = 2;

export default function GalleryScreen() {
  const { width } = useWindowDimensions();
  const [active, setActive] = useState<Category>('All');
  const tileSize = (width - spacing.lg * 2 - GAP * (COLUMNS - 1)) / COLUMNS;

  const filtered = useMemo(
    () => (active === 'All' ? photos : photos.filter((p) => p.category === active)),
    [active],
  );
  const [hero, ...rest] = filtered;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>In Pictures</Text>
        <Text style={styles.title}>Gallery</Text>
      </View>

      <View style={styles.chipRow}>
        {CATEGORIES.map((cat) => (
          <Pressable key={cat} onPress={() => setActive(cat)} style={[styles.chip, active === cat && styles.chipActive]}>
            <Text style={[styles.chipText, active === cat && styles.chipTextActive]}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        key={active}
        data={rest}
        keyExtractor={(_, i) => `${active}-${i}`}
        numColumns={COLUMNS}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}
        columnWrapperStyle={{ gap: GAP }}
        ItemSeparatorComponent={() => <View style={{ height: GAP }} />}
        ListHeaderComponent={
          hero ? (
            <Image
              source={hero.source}
              style={{ width: width - spacing.lg * 2, height: tileSize * 1.15, marginBottom: GAP }}
              resizeMode="cover"
            />
          ) : null
        }
        renderItem={({ item }) => (
          <Image source={item.source} style={{ width: tileSize, height: tileSize }} resizeMode="cover" />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.md },
  eyebrow: {
    fontFamily: typography.bodyMedium,
    color: colors.gold,
    fontSize: 13,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: { fontFamily: typography.display, color: colors.ink, fontSize: 30 },
  chipRow: { flexDirection: 'row', gap: 10, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  chipActive: { borderColor: colors.gold },
  chipText: {
    fontFamily: typography.bodyMedium,
    fontSize: 11.5,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.inkMuted,
  },
  chipTextActive: { color: colors.gold },
});
