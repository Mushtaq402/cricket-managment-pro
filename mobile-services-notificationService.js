import * as Notifications from 'expo-notifications';
import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const notificationService = {
  async registerForPushNotifications() {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return null;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      await AsyncStorage.setItem('expoPushToken', token);
      await this.registerTokenWithServer(token);

      return token;
    } catch (error) {
      console.error('Error registering for push notifications:', error);
      return null;
    }
  },

  async registerTokenWithServer(token) {
    try {
      await apiClient.post('/notifications/register-token', { token });
    } catch (error) {
      console.error('Error registering token with server:', error);
    }
  },

  async sendNotification(title, body, data = {}) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: 'default',
        },
        trigger: { seconds: 1 },
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  },

  async getNotifications() {
    try {
      const response = await apiClient.get('/notifications');
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  },

  async markAsRead(notificationId) {
    try {
      await apiClient.put(`/notifications/${notificationId}/read`);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  },

  async deleteNotification(notificationId) {
    try {
      await apiClient.delete(`/notifications/${notificationId}`);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  },

  setupNotificationListeners() {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const { notification } = response;
      // Handle notification tap
      console.log('Notification tapped:', notification);
    });

    return subscription;
  },
};

export default notificationService;
