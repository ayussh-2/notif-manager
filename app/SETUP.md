# Flutter App Setup Guide

## 🔐 Security Notice

**IMPORTANT**: The actual Firebase configuration files are gitignored for security. You need to set them up locally.

## Setup Instructions

### 1. Firebase Configuration Files

You need to create two files from the example templates:

#### A. `lib/firebase_options.dart`

```bash
# Copy the example file
cp lib/firebase_options.dart.example lib/firebase_options.dart
```

Then edit `lib/firebase_options.dart` and replace the placeholder values with your actual Firebase credentials from the Firebase Console.

#### B. `android/app/google-services.json`

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings → Your apps → Android app
4. Download `google-services.json`
5. Place it in `android/app/google-services.json`

**OR** copy the example and fill in your values:
```bash
cp android/app/google-services.json.example android/app/google-services.json
```

### 2. Install Dependencies

```bash
flutter pub get
```

### 3. Run the App

```bash
flutter run
```

## 🔒 Gitignored Files (DO NOT COMMIT)

The following files contain sensitive credentials and are automatically ignored by git:

- `lib/firebase_options.dart` - Firebase configuration
- `android/app/google-services.json` - Google Services config
- `.env` - Environment variables (if used)

**Example templates** (safe to commit):
- `lib/firebase_options.dart.example`
- `android/app/google-services.json.example`

## Getting Firebase Credentials

### From Firebase Console:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon → Project Settings
4. Scroll down to "Your apps"
5. Select your Android app (or add one if needed)
6. Download `google-services.json`

### Values you need:

From `google-services.json`, extract:
- `project_id`
- `project_number` (messagingSenderId)
- `mobilesdk_app_id` (appId)
- `current_key` (apiKey)
- `storage_bucket`

## Alternative: Use FlutterFire CLI

If you prefer automated setup:

```bash
# Login to Firebase
firebase login

# Configure FlutterFire
flutterfire configure
```

This will automatically create `lib/firebase_options.dart` for you.

## Troubleshooting

### "Missing google-services.json"
- Make sure the file is in `android/app/google-services.json`
- Verify the package name matches: `com.notifmanager.notif_manager`

### "Firebase not initialized"
- Ensure `firebase_options.dart` exists and has valid credentials
- Check that you've run `flutter pub get`

### "Permission denied"
- Android 13+ requires notification permissions
- The app requests this automatically on first launch

## Testing Notifications

1. Run the app: `flutter run`
2. Check console for "Subscribed to all_users topic"
3. Copy the FCM token from console
4. Use the admin portal to send a test notification
5. Notification should appear in the app!

## Security Best Practices

✅ **DO**:
- Keep `firebase_options.dart` and `google-services.json` in `.gitignore`
- Use example files as templates
- Share setup instructions, not credentials

❌ **DON'T**:
- Commit actual Firebase credentials
- Share `google-services.json` publicly
- Hardcode API keys in code
