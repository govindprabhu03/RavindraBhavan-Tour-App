import { Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing } from '../../src/theme/theme';
import { contact } from '../../src/data/venue';
import { PinIcon, PhoneIcon, MailIcon } from '../../src/components/Icons';

function openDirections() {
  const query = encodeURIComponent(`${contact.name}, ${contact.address}`);
  const url = Platform.select({
    ios: `maps:0,0?q=${query}`,
    android: `geo:0,0?q=${query}`,
    default: `https://www.google.com/maps/search/?api=1&query=${query}`,
  });
  Linking.openURL(url as string).catch(() =>
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`)
  );
}

export default function ContactScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>Plan Your Visit</Text>
        <Text style={styles.title}>Book the Venue</Text>
        <Text style={styles.intro}>
          Secure your spot and check availability & rates for your next show, workshop or gathering.
        </Text>

        <View style={styles.row}>
          <View style={styles.iconBadge}>
            <PinIcon color={colors.gold} size={18} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{contact.address}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.iconBadge}>
            <PhoneIcon color={colors.gold} size={18} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{contact.phone}</Text>
          </View>
        </View>
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <View style={styles.iconBadge}>
            <MailIcon color={colors.gold} size={18} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{contact.email}</Text>
          </View>
        </View>

        <Pressable onPress={openDirections} style={styles.mapCard}>
          <LinearGradient
            colors={['rgba(201,162,75,0.14)', 'rgba(201,162,75,0)']}
            style={StyleSheet.absoluteFillObject}
          />
          <PinIcon color={colors.gold} size={26} />
          <Text style={styles.mapCardText}>Tap to open in Maps</Text>
        </Pressable>

        <Pressable
          style={styles.cta}
          onPress={() => Linking.openURL(`tel:${contact.bookingPhone}`)}
        >
          <Text style={styles.ctaText}>Call to Book — {contact.bookingPhone}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  eyebrow: {
    fontFamily: typography.bodyMedium,
    color: colors.gold,
    fontSize: 13,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  title: { fontFamily: typography.display, color: colors.ink, fontSize: 32, marginBottom: spacing.md },
  intro: {
    fontFamily: typography.body,
    color: colors.inkMuted,
    fontSize: 18,
    lineHeight: 26,
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
    paddingVertical: spacing.md,
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(201,162,75,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  label: {
    fontFamily: typography.bodyMedium,
    color: colors.gold,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  value: { fontFamily: typography.body, color: colors.ink, fontSize: 17 },
  mapCard: {
    marginTop: spacing.xl,
    height: 130,
    borderWidth: 1,
    borderColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    overflow: 'hidden',
  },
  mapCardText: {
    fontFamily: typography.bodyMedium,
    fontSize: 13,
    letterSpacing: 1,
    color: colors.inkMuted,
    textTransform: 'uppercase',
  },
  cta: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.gold,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  ctaText: {
    fontFamily: typography.bodyMedium,
    color: colors.gold,
    fontSize: 16,
    letterSpacing: 1,
  },
});
