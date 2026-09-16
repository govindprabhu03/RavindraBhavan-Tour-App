import { useCallback, useState } from 'react';
import { useFocusEffect, router } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '../../src/theme/theme';
import { fetchUpcomingEvents, fetchUpdates, type EventRow, type UpdateRow } from '../../src/lib/supabase';

function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString('en-IN', { day: '2-digit' }),
    month: d.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase(),
  };
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });
}

function formatRelative(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function EventsScreen() {
  const [events, setEvents] = useState<EventRow[] | null>(null);
  const [updates, setUpdates] = useState<UpdateRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      const [eventsData, updatesData] = await Promise.all([fetchUpcomingEvents(), fetchUpdates()]);
      setEvents(eventsData);
      setUpdates(updatesData);
    } catch {
      setError('Could not load events. Pull down to try again.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const featured = events?.find((e) => e.is_featured) ?? events?.[0];
  const rest = events?.filter((e) => e.id !== featured?.id) ?? [];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={rest}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl tintColor={colors.gold} refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.eyebrow}>What&rsquo;s On</Text>
              <Text style={styles.title}>Upcoming Events</Text>
              <Text style={styles.intro}>Performances, workshops and exhibitions at the venue.</Text>
            </View>

            {events === null && !error && (
              <ActivityIndicator style={{ marginTop: spacing.xl }} color={colors.gold} />
            )}

            {error && <Text style={styles.error}>{error}</Text>}

            {events !== null && events.length === 0 && !error && (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>No upcoming events right now — check back soon.</Text>
              </View>
            )}

            {featured && (
              <Pressable
                onPress={() => router.push(`/event/${featured.slug}`)}
                style={styles.featured}
              >
                {featured.cover_image_url && (
                  <Image source={{ uri: featured.cover_image_url }} style={StyleSheet.absoluteFillObject} />
                )}
                <View style={styles.featuredOverlay} />
                <View style={styles.featuredContent}>
                  <Text style={styles.tag}>Featured</Text>
                  <Text style={styles.featuredTitle}>{featured.title}</Text>
                  <Text style={styles.featuredMeta}>
                    {formatDate(featured.starts_at).day} {formatDate(featured.starts_at).month} · {featured.location_text}
                  </Text>
                </View>
              </Pressable>
            )}
          </View>
        }
        renderItem={({ item }) => {
          const { day, month } = formatDate(item.starts_at);
          return (
            <Pressable onPress={() => router.push(`/event/${item.slug}`)} style={styles.card}>
              <View style={styles.dateBlock}>
                <Text style={styles.dateDay}>{day}</Text>
                <Text style={styles.dateMonth}>{month}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardMeta}>
                  {formatTime(item.starts_at)} · {item.location_text}
                </Text>
              </View>
              {item.cover_image_url && (
                <Image source={{ uri: item.cover_image_url }} style={styles.thumb} />
              )}
            </Pressable>
          );
        }}
        ListFooterComponent={
          updates && updates.length > 0 ? (
            <View style={styles.newsSection}>
              <Text style={styles.eyebrow}>From the Venue</Text>
              <Text style={styles.newsTitle}>Latest News</Text>
              {updates.map((u) => (
                <View key={u.id} style={styles.newsCard}>
                  {u.cover_image_url && (
                    <Image source={{ uri: u.cover_image_url }} style={styles.newsThumb} />
                  )}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.newsCardTitle}>{u.title}</Text>
                    <Text style={styles.newsCardBody} numberOfLines={3}>
                      {u.body}
                    </Text>
                    <Text style={styles.newsCardDate}>{formatRelative(u.published_at)}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  eyebrow: {
    fontFamily: typography.bodyMedium,
    color: colors.gold,
    fontSize: 13,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: { fontFamily: typography.display, color: colors.ink, fontSize: 30, marginBottom: 6 },
  intro: { fontFamily: typography.body, color: colors.inkMuted, fontSize: 16 },
  error: { color: '#E08585', fontFamily: typography.body, fontSize: 15, paddingHorizontal: spacing.lg, marginTop: spacing.md },
  empty: { paddingHorizontal: spacing.lg, paddingVertical: spacing.xl },
  emptyText: { fontFamily: typography.body, color: colors.inkMuted, fontSize: 16, textAlign: 'center' },
  featured: {
    marginTop: spacing.lg,
    marginHorizontal: spacing.lg,
    height: 190,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11,10,8,0.55)',
  },
  featuredContent: { position: 'absolute', left: 20, right: 20, bottom: 16 },
  tag: {
    alignSelf: 'flex-start',
    fontFamily: typography.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.gold,
    borderWidth: 1,
    borderColor: 'rgba(201,162,75,0.4)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  featuredTitle: { fontFamily: typography.display, color: colors.ink, fontSize: 21, fontWeight: '600' },
  featuredMeta: { fontFamily: typography.body, color: colors.inkMuted, fontSize: 14, marginTop: 4 },
  card: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: spacing.lg,
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
    alignItems: 'center',
  },
  dateBlock: {
    width: 52,
    height: 58,
    borderWidth: 1,
    borderColor: 'rgba(201,162,75,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateDay: { fontFamily: typography.display, fontSize: 22, color: colors.gold, fontWeight: '600', lineHeight: 24 },
  dateMonth: { fontFamily: typography.bodyMedium, fontSize: 10, letterSpacing: 1.5, color: colors.gold, marginTop: 2 },
  cardTitle: { fontFamily: typography.display, fontSize: 18, color: colors.ink, fontWeight: '600', marginBottom: 4 },
  cardMeta: { fontFamily: typography.body, fontSize: 13, color: colors.inkMuted },
  thumb: { width: 56, height: 56 },
  newsSection: { marginTop: spacing.xl, paddingHorizontal: spacing.lg },
  newsTitle: { fontFamily: typography.display, color: colors.ink, fontSize: 24, marginBottom: spacing.md },
  newsCard: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  newsThumb: { width: 72, height: 72, flexShrink: 0 },
  newsCardTitle: { fontFamily: typography.display, fontSize: 16, color: colors.ink, fontWeight: '600', marginBottom: 3 },
  newsCardBody: { fontFamily: typography.body, fontSize: 14, lineHeight: 19, color: colors.inkMuted },
  newsCardDate: {
    fontFamily: typography.bodyMedium,
    fontSize: 10.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.gold,
    marginTop: 6,
  },
});
