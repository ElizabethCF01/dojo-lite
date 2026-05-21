import { StyleSheet, Text, View } from 'react-native';

type HeaderProps = {
  className: string;
  studentCount: number;
};

export function Header({ className, studentCount }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{className}</Text>
      <Text style={styles.subtitle}>{studentCount} students</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46E5',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    color: '#E0E7FF',
    fontSize: 14,
    marginTop: 4,
  },
});
