import { StyleSheet, Text, View } from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <Text>About</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 16,
  },
});
