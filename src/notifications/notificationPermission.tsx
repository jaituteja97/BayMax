import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from '@notifee/react-native';
import { Alert, Platform } from 'react-native';

/**
 * Request permission + create channel + check restrictions
 */
export async function setupNotifeePermissions(): Promise<boolean> {
  try {
    // --------------------------------
    // 1️⃣ Request Notification Permission
    // --------------------------------
    const settings = await notifee.requestPermission({
      alert: true,
      sound: true,
      badge: true,
    });

    if (settings.authorizationStatus < AuthorizationStatus.AUTHORIZED) {
      Alert.alert(
        'Permission Required',
        'Please allow notification permission to receive alerts.',
      );
      return false;
    }

    // --------------------------------
    // 2️⃣ Create Channel (Android)
    // --------------------------------
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Notifications',
        importance: AndroidImportance.HIGH,
      });
    }

    // --------------------------------
    // 3️⃣ Battery Optimization Check (Android)
    // --------------------------------
    if (Platform.OS === 'android') {
      const batteryOptimizationEnabled =
        await notifee.isBatteryOptimizationEnabled();

      if (batteryOptimizationEnabled) {
        Alert.alert(
          'Restrictions Detected',
          'Disable battery optimization to ensure notifications are delivered.',
          [
            {
              text: 'Open Settings',
              onPress: async () =>
                await notifee.openBatteryOptimizationSettings(),
            },
            { text: 'Cancel', style: 'cancel' },
          ],
        );
      }

      // --------------------------------
      // 4️⃣ Power Manager (OEM Devices)
      // --------------------------------
      const powerManagerInfo = await notifee.getPowerManagerInfo();

      if (powerManagerInfo.activity) {
        Alert.alert(
          'Background Restriction',
          'Allow the app to run in background to receive notifications.',
          [
            {
              text: 'Open Settings',
              onPress: async () =>
                await notifee.openPowerManagerSettings(),
            },
            { text: 'Cancel', style: 'cancel' },
          ],
        );
      }
    }

    return true;
  } catch (error) {
    console.log('Notifee setup error:', error);
    return false;
  }
}

/**
 * Display a local notification
 */
export async function showLocalNotification(
  title: string,
  body: string,
) {
  // increment badge safely
  const currentBadge = await notifee.getBadgeCount();
  await notifee.setBadgeCount(currentBadge + 1);

  await notifee.displayNotification({
    title,
    body,
    ios: {
      badgeCount: currentBadge + 1,
    },
    android: {
      channelId: 'default',
      pressAction: {
        id: 'default',
      },
    },
  });
}

/**
 * Clear app badge
 */
export async function clearBadge() {
  await notifee.setBadgeCount(0);
}

/**
 * Decrease badge by 1
 */
export async function decrementBadge() {
  const current = await notifee.getBadgeCount();
  await notifee.setBadgeCount(Math.max(0, current - 1));
}
