import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Polyline } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing } from '../../src/theme/theme';
import { amenities, type AmenityIcon } from '../../src/data/venue';
import { fetchCouncil, type CouncilMemberRow } from '../../src/lib/supabase';
import {
  AuditoriumIcon,
  TheatreIcon,
  LibraryIcon,
  ParkingIcon,
  ExhibitionIcon,
  SnacksIcon,
  TrainingIcon,
  ServiceIcon,
} from '../../src/components/Icons';

const COMMITTEE_LABELS: Record<CouncilMemberRow['committee'], string> = {
  general_council: 'General Council',
  executive_committee: 'Executive Committee',
};

const ICONS: Record<AmenityIcon, typeof AuditoriumIcon> = {
  auditorium: AuditoriumIcon,
  theatre: TheatreIcon,
  library: LibraryIcon,
  parking: ParkingIcon,
  exhibition: ExhibitionIcon,
  snacks: SnacksIcon,
  training: TrainingIcon,
  service: ServiceIcon,
};

function ZigzagRule() {
  return (
    <Svg width={52} height={7} viewBox="0 0 52 7" style={{ marginBottom: spacing.md }}>
      <Polyline
        points="0,6 6.5,1 13,6 19.5,1 26,6 32.5,1 39,6 45.5,1 52,6"
        fill="none"
        stroke={colors.gold}
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function AboutScreen() {
  const { width } = useWindowDimensions();
  const [council, setCouncil] = useState<CouncilMemberRow[] | null>(null);
  const [councilError, setCouncilError] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchCouncil()
        .then(setCouncil)
        .catch(() => setCouncilError(true));
    }, []),
  );

  const byCommittee = (committee: CouncilMemberRow['committee']) =>
    (council ?? []).filter((m) => m.committee === committee);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md }}>
          <Text style={styles.eyebrow}>Department of Art & Culture, Goa</Text>
          <Text style={styles.title}>Our Amenities</Text>
          <ZigzagRule />
          <Text style={styles.intro}>
            Built over a 30,067.57 sq. m. plot with ample parking and well-designed driveways, Ravindra
            Bhavan Sankhali fosters and promotes dance, music, literature and the performing arts.
          </Text>
        </View>

        <View style={{ paddingHorizontal: spacing.lg }}>
          {amenities.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <View
                key={item.title}
                style={[styles.row, i === amenities.length - 1 && { borderBottomWidth: 0 }]}
              >
                <View style={styles.iconBadge}>
                  <Icon color={colors.gold} size={18} />
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={styles.rowTitle}>{item.title}</Text>
                  <Text style={styles.rowDesc}>{item.description}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.photoBreak}>
          <Image
            source={require('../../assets/tour-images/03-auditorium-stage.jpg')}
            style={{ width, height: 220 }}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(11,10,8,0)', 'rgba(11,10,8,0.4)', 'rgba(11,10,8,0.9)']}
            locations={[0, 0.4, 1]}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.photoBreakContent}>
            <Text style={styles.photoBreakEyebrow}>Manoharbuva Shirgaonkar Sabhagraha</Text>
            <Text style={styles.photoBreakTitle}>The Grand Auditorium</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xl }}>
          <Text style={styles.eyebrow}>Governance</Text>
          <Text style={styles.title}>Council</Text>
          <ZigzagRule />

          {council === null && !councilError && (
            <ActivityIndicator style={{ marginVertical: spacing.lg }} color={colors.gold} />
          )}
          {councilError && (
            <Text style={styles.rowDesc}>Could not load council members right now.</Text>
          )}

          {(['general_council', 'executive_committee'] as const).map((committee) => {
            const members = byCommittee(committee);
            if (council !== null && members.length === 0) return null;
            return (
              <View key={committee} style={{ marginBottom: spacing.lg }}>
                <Text style={styles.committeeLabel}>{COMMITTEE_LABELS[committee]}</Text>
                {members.map((member, i) => {
                  const isLeadership = member.role !== 'Member';
                  return (
                    <View
                      key={member.id}
                      style={[styles.councilRow, i === members.length - 1 && { borderBottomWidth: 0 }]}
                    >
                      <Text style={[styles.councilName, isLeadership && styles.councilNameLead]}>
                        {member.name}
                      </Text>
                      <Text style={[styles.councilRole, isLeadership && styles.councilRoleLead]}>
                        {member.role}
                      </Text>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xxl },
  eyebrow: {
    fontFamily: typography.bodyMedium,
    color: colors.gold,
    fontSize: 13,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  title: {
    fontFamily: typography.display,
    color: colors.ink,
    fontSize: 32,
    marginBottom: spacing.md,
  },
  intro: {
    fontFamily: typography.body,
    color: colors.inkMuted,
    fontSize: 18,
    lineHeight: 26,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
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
  rowTitle: { fontFamily: typography.display, fontSize: 19, color: colors.ink, fontWeight: '600' },
  rowDesc: { fontFamily: typography.body, fontSize: 15, lineHeight: 21, color: colors.inkMuted },
  photoBreak: { marginTop: spacing.lg, height: 220 },
  photoBreakContent: { position: 'absolute', left: spacing.lg, right: spacing.lg, bottom: 20 },
  photoBreakEyebrow: {
    fontFamily: typography.bodyMedium,
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: colors.gold,
    marginBottom: 6,
  },
  photoBreakTitle: { fontFamily: typography.display, fontSize: 22, color: colors.ink, fontWeight: '600' },
  committeeLabel: {
    fontFamily: typography.bodyMedium,
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.inkMuted,
    marginBottom: 6,
    marginTop: spacing.sm,
  },
  councilRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  councilName: { fontFamily: typography.body, fontSize: 16, color: colors.inkMuted, flex: 1, paddingRight: spacing.md },
  councilNameLead: { fontFamily: typography.display, fontSize: 18, color: colors.ink, fontWeight: '600' },
  councilRole: { fontFamily: typography.bodyMedium, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: colors.inkMuted },
  councilRoleLead: { color: colors.gold },
});
