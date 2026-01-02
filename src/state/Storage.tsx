// storage.ts
import { MMKV } from 'react-native-mmkv';

// Normal storage
export const storage = new MMKV();

// Encrypted storage
export const secureStorage = new MMKV({
  id: 'secure-storage',
  encryptionKey: 'my-secret-key',
});

export const setItem = (key: string, value: string) => {
  secureStorage.set(key, value);
};

export const getItem = (key: string) => {
  return secureStorage.getString(key);
};

export const removeItem = (key: string) => {
  secureStorage.delete(key);
};
