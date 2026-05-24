import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from './Avatar';

type StudentCardProps = {
  name: string;
  points: number;
  onAddPoint: () => void;
};

export function StudentCard({ name, points, onAddPoint }: StudentCardProps) {
  const avatarBg = points >= 5 ? '10B981' : points < 0 ? 'EF4444' : 'F3F4F6';

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Avatar seed={name} backgroundColor={avatarBg} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.points}>{points} pts</Text>
        </View>
      </View>
      <Pressable onPress={onAddPoint} style={styles.btn}>
        <Text style={styles.btnText}>+1</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  points: {
    fontSize: 13,
    color: '#6B7280',
  },
  btn: {
    backgroundColor: '#10B981',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
