import { SafeAreaView, StyleSheet } from 'react-native';
import { AuthForm } from '#features/auth';
import { colors } from '#shared/design/foundations';

export default function Login() {
  return (
    <SafeAreaView style={styles.safe}>
      <AuthForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
