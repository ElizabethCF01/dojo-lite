import { FontAwesome6 } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
  Pressable,
  RefreshControl,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';
import { useClasses, useLeaderboard } from '#features/classes';
import {
  buildLeaderboardSections,
  type LeaderboardEntry,
} from '#features/students';
import { Avatar, Flair, Icon, Typography } from '#shared/design/elements';
import { colors, radii, spacing } from '#shared/design/foundations';
import { formatPoints, pluralize } from '#shared/design/helpers';

export default function Leaderboard() {
  const { classes } = useClasses();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const classId = selectedId ?? classes[0]?.id ?? '';
  const { students, loading, refresh } = useLeaderboard(classId);

  const sections = useMemo(
    () => buildLeaderboardSections(students),
    [students],
  );

  return (
    <View style={styles.container}>
      {classes.length > 1 && (
        <View style={styles.tabs}>
          {classes.map((c) => {
            const active = c.id === classId;
            return (
              <Pressable
                key={c.id}
                onPress={() => setSelectedId(c.id)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Typography
                  variant="label"
                  color={active ? 'textOnBrand' : 'textSecondary'}
                  numberOfLines={1}
                >
                  {c.name}
                </Typography>
              </Pressable>
            );
          })}
        </View>
      )}

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Typography variant="subtitle">{section.title}</Typography>
            <Flair label={pluralize(section.data.length, 'student')} />
          </View>
        )}
        renderItem={({ item }) => <LeaderboardRow entry={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="trophy" size={32} color="textMuted" />
            <Typography variant="label" color="textSecondary">
              No standings yet
            </Typography>
            <Typography variant="caption" color="textMuted">
              Award points to students to build the leaderboard.
            </Typography>
          </View>
        }
      />
    </View>
  );
}

const MEDAL_COLORS: Record<number, string> = {
  1: '#F59E0B',
  2: '#9CA3AF',
  3: '#B45309',
};

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  const medal = MEDAL_COLORS[entry.rank];

  return (
    <View style={styles.row}>
      <View style={styles.rank}>
        {medal ? (
          <FontAwesome6
            name="medal"
            size={20}
            color={medal}
            iconStyle="solid"
          />
        ) : (
          <Typography variant="label" color="textSecondary">
            {entry.rank}
          </Typography>
        )}
      </View>
      <Avatar seed={entry.name} config={entry.avatar} />
      <View style={styles.name}>
        <Typography variant="label">{entry.name}</Typography>
      </View>
      <Flair label={formatPoints(entry.points)} tone="brand" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  list: {
    padding: spacing.lg,
    flexGrow: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  rank: {
    width: 24,
    alignItems: 'center',
  },
  name: {
    flex: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingTop: spacing['3xl'],
  },
});
