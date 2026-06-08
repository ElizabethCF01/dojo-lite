import { SafeAreaView, StyleSheet } from 'react-native';
import { colors } from '#design/foundations';
import { AuthForm } from '#features/auth';

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
