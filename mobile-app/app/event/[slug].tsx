import { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing } from '../../src/theme/theme';
import { fetchEventBySlug, type EventRow } from '../../src/lib/supabase';

function formatDateRange(startsIso: string, endsIso: string | null) {
  const start = new Date(startsIso);
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  if (!endsIso) return start.toLocaleDateString('en-IN', opts);
  const end = new Date(endsIso);
  if (start.toDateString() === end.toDateString()) return start.toLocaleDateString('en-IN', opts);
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()}–${end.toLocaleDateString('en-IN', opts)}`;
  }
  return `${start.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })} – ${end.toLocaleDateString('en-IN', opts)}`;
}

export default function EventDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [event, setEvent] = useState<EventRow | null | undefined>(undefined);

  useEffect(() => {
    fetchEventBySlug(slug).then(setEvent).catch(() => setEvent(null));
  }, [slug]);

  if (event === undefined) {
    return (
      <SafeAreaView style={styles.loadingSafe}>
        <ActivityIndicator color={colors.gold} />
      </SafeAreaView>
    );
  }

  if (event === null) {
    return (
      <SafeAreaView style={styles.loadingSafe}>
        <Text style={styles.notFound}>Event not found.</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Go back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          {event.cover_image_url && (
            <Image source={{ uri: event.cover_image_url }} style={StyleSheet.absoluteFillObject} />
          )}
          <LinearGradient
            colors={['rgba(11,10,8,0.5)', 'rgba(11,10,8,0.05)', 'rgba(11,10,8,0.95)']}
            locations={[0, 0.3, 1]}
            style={StyleSheet.absoluteFillObject}
          />
          <SafeAreaView edges={['top']} style={styles.backButtonSafe}>
            <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={10}>
              <Text style={styles.backButtonText}>‹</Text>
            </Pressable>
          </SafeAreaView>
          <View style={styles.heroContent}>
            <Text style={styles.heroDate}>{formatDateRange(event.starts_at, event.ends_at)}</Text>
            <Text style={styles.heroTitle}>{event.title}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <MetaRow label={new Date(event.starts_at).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })} />
          <MetaRow label={event.location_text} />

          {event.description && (
            <View style={{ marginTop: spacing.lg }}>
              <View style={styles.rule} />
              <Text style={styles.description}>{event.description}</Text>
            </View>
          )}

          <Pressable
            style={styles.cta}
            onPress={() =>
              Linking.openURL(
                `tel:+917499844824`,
              )
            }
          >
            <Text style={styles.ctaText}>Call to Reserve</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function MetaRow({ label }: { label: string }) {
  return (
    <View style={styles.metaRow}>
      <View style={styles.metaDot} />
      <Text style={styles.metaLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingSafe: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', gap: 12 },
  notFound: { fontFamily: typography.body, color: colors.inkMuted, fontSize: 16 },
  backLink: { fontFamily: typography.bodyMedium, color: colors.gold, fontSize: 15 },
  hero: { height: 300, position: 'relative' },
  backButtonSafe: { position: 'absolute', top: 0, left: 0 },
  backButton: {
    marginTop: 12,
    marginLeft: 18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(11,10,8,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: { color: colors.ink, fontSize: 22, lineHeight: 22, marginRight: 2 },
  heroContent: { position: 'absolute', left: 26, right: 26, bottom: 20 },
  heroDate: {
    fontFamily: typography.bodyMedium,
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: colors.gold,
    marginBottom: 8,
  },
  heroTitle: { fontFamily: typography.display, fontSize: 28, color: colors.ink, fontWeight: '600' },
  body: { padding: spacing.lg },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  metaDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.gold },
  metaLabel: { fontFamily: typography.body, fontSize: 16, color: colors.ink },
  rule: { width: 52, height: 2, backgroundColor: colors.gold, marginBottom: 18 },
  description: { fontFamily: typography.body, fontSize: 17, lineHeight: 26, color: colors.inkMuted },
  cta: {
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.gold,
    paddingVertical: 15,
    alignItems: 'center',
  },
  ctaText: { fontFamily: typography.bodyMedium, fontSize: 15, letterSpacing: 1, color: colors.gold },
});
