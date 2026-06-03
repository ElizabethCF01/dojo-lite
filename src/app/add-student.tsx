import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useStudents } from '#features/students';
import { Button, Typography } from '#shared/design/elements';
import { colors, fontSize, radii, spacing } from '#shared/design/foundations';

export default function AddStudent() {
  const router = useRouter();
  const { addStudent } = useStudents();
  const [name, setName] = useState('');

  const submit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    addStudent(trimmed);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Typography variant="label" color="textSecondary">
        Student name
      </Typography>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="e.g. Juana"
        style={styles.input}
        autoFocus
      />
      <Button label="Add" onPress={submit} fullWidth />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    gap: spacing.md,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
});
