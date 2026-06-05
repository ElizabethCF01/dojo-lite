import AsyncStorage from '@react-native-async-storage/async-storage';

const SEEN_KEY = 'dojolite_onboarding_seen';

export async function hasSeenOnboarding(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(SEEN_KEY)) === 'true';
  } catch {
    return false;
  }
}

export async function markOnboardingSeen(): Promise<void> {
  try {
    await AsyncStorage.setItem(SEEN_KEY, 'true');
  } catch {
    // Failing to persist the flag only means onboarding shows again.
  }
}
