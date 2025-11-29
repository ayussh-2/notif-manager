# Notification Manager - Flutter App

A Flutter Android app that receives FCM push notifications from the admin portal.

## 🔐 Security Notice

**Firebase credentials are gitignored for security.** See [SETUP.md](SETUP.md) for instructions on configuring your local environment with Firebase credentials.

## Features

- ✅ Firebase Cloud Messaging (FCM) integration
- ✅ Automatic subscription to `all_users` topic
- ✅ Foreground and background notification handling
- ✅ Notification history display
- ✅ FCM token viewer for testing

## Setup Instructions

### 1. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Add an Android app:
   - Package name: `com.notifmanager.notif_manager`
   - Download `google-services.json`
   - Place it in `app/android/app/`

### 2. Run FlutterFire CLI (Recommended)

```bash
dart pub global activate flutterfire_cli

flutterfire configure
```

This will automatically:
- Create `lib/firebase_options.dart`
- Configure Android app settings
- Set up Firebase dependencies

### 3. Install Dependencies

```bash
flutter pub get
```

### 4. Run the App

```bash
flutter run
```

## How It Works

### Topic Subscription

The app automatically subscribes to the `all_users` topic on startup:

```dart
await FirebaseMessaging.instance.subscribeToTopic('all_users');
```

### Notification Handling

- **Foreground**: Shows a heads-up notification on screen (like WhatsApp) and adds to the notification list
- **Background**: Shows a heads-up notification on screen with sound and vibration
- **Terminated**: Notification appears in system tray

All notifications use high-priority channels to ensure they appear as heads-up notifications on your screen before going to the notification panel.

### Testing Notifications

1. Run the app on a physical device or emulator
2. Go to the admin portal at `http://localhost:3000`
3. Log in and send a broadcast notification
4. The notification should appear in the app!

### Getting FCM Token

Tap the info button (floating action button) to view your device's FCM token. This is useful for:
- Testing individual device notifications
- Debugging FCM setup
- Verifying Firebase configuration

## Project Structure

```
lib/
└── main.dart          # Main app with FCM setup and UI
```

## Troubleshooting

### Notifications not received?

1. **Check Firebase configuration**:
   - Ensure `google-services.json` is in `android/app/`
   - Verify package name matches in Firebase Console

2. **Check topic subscription**:
   - Look for "Subscribed to all_users topic" in console logs

3. **Check FCM token**:
   - Tap the info button to view token
   - Verify token is generated successfully

4. **Check permissions**:
   - Android 13+ requires notification permission
   - App requests permission on first launch

### Build errors?

```bash
# Clean and rebuild
flutter clean
flutter pub get
flutter run
```
## Dependencies

- `firebase_core` - Firebase initialization
- `firebase_messaging` - FCM notifications
- `flutter_local_notifications` - Local notification display with heads-up behavior
