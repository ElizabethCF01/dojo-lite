import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { ApiError } from '#shared/api';
import { Button, Typography } from '#shared/design/elements';
import { colors, fontSize, radii, spacing } from '#shared/design/foundations';
import { useAuth } from '../store/AuthProvider';
import type { Role } from '../types';

type Mode = 'login' | 'register';

export function AuthForm() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('teacher');
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login(email.trim(), password);
      } else {
        await register({
          email: email.trim(),
          password,
          name: name.trim(),
          role,
          joinCode:
            role === 'student' ? joinCode.trim() || undefined : undefined,
        });
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Typography variant="title">
        {mode === 'login' ? 'Log in' : 'Create account'}
      </Typography>

      {mode === 'register' && (
        <>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            style={styles.input}
          />
          <View style={styles.roleRow}>
            <Button
              label="Teacher"
              size="sm"
              variant={role === 'teacher' ? 'primary' : 'ghost'}
              onPress={() => setRole('teacher')}
            />
            <Button
              label="Student"
              size="sm"
              variant={role === 'student' ? 'primary' : 'ghost'}
              onPress={() => setRole('student')}
            />
          </View>
          {role === 'student' && (
            <TextInput
              value={joinCode}
              onChangeText={setJoinCode}
              placeholder="Class code (optional)"
              autoCapitalize="characters"
              style={styles.input}
            />
          )}
        </>
      )}

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      {error && (
        <Typography variant="caption" color="danger">
          {error}
        </Typography>
      )}

      <Button
        label={mode === 'login' ? 'Log in' : 'Sign up'}
        onPress={submit}
        disabled={submitting}
        fullWidth
      />
      <Button
        label={
          mode === 'login' ? 'No account? Sign up' : 'Have an account? Log in'
        }
        variant="ghost"
        size="sm"
        onPress={() => {
          setError(null);
          setMode(mode === 'login' ? 'register' : 'login');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  roleRow: {
    flexDirection: 'row',
    gap: spacing.sm,
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
