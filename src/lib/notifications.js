import pb from '@/lib/pocketbaseClient';

// CREATE NOTIFICATION
export const createNotification = async ({
  user_id,
  title,
  message,
  type = 'info',
}) => {
  try {
    await pb.collection('notifications').create({
      user_id,
      title,
      message,
      type,
      read: false,
      created_by: pb.authStore.model?.id,
    });
  } catch (error) {
    console.error(
      'Notification Error:',
      error
    );
  }
};