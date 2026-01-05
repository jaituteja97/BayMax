import Tts from 'react-native-tts';
import { Platform } from 'react-native';

export const stopTtsSafely = () => {
  try {
    Tts.stop();

    // shutdown exists on Android at runtime
    if (Platform.OS === 'android') {
      (Tts as any).shutdown();
    }
  } catch (e) {
    // swallow error safely
  }
};
