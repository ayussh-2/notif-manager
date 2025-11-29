import { initializeApp, cert, getApps, type ServiceAccount } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
  try {
    if (getApps().length === 0) {
      const config = useRuntimeConfig();
      
      const serviceAccount: ServiceAccount = {
        projectId: config.firebaseAdminProjectId,
        clientEmail: config.firebaseAdminClientEmail,
        privateKey: config.firebaseAdminPrivateKey.replace(/\\n/g, '\n'),
      };

      initializeApp({
        credential: cert(serviceAccount),
      });
    }

    const body = await readBody(event);
    const { title, body: messageBody, userId, userEmail } = body;

    if (!title || !messageBody) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Title and body are required',
      });
    }

    const message = {
      notification: {
        title: title,
        body: messageBody,
      },
      topic: 'all_users',
    };

    const messaging = getMessaging();
    const response = await messaging.send(message);

    const db = getFirestore();
    const notificationLog = {
      title: title,
      body: messageBody,
      topic: 'all_users',
      sentBy: {
        userId: userId || 'unknown',
        email: userEmail || 'unknown',
      },
      sentAt: Timestamp.now(),
      messageId: response,
      status: 'sent',
    };

    await db.collection('notification_logs').add(notificationLog);

    return {
      success: true,
      messageId: response,
      message: 'Notification sent successfully',
    };
  } catch (error: any) {
    console.error('Error sending notification:', error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to send notification',
    });
  }
});
