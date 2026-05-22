import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase if not already initialized
if (!firebase.getApps().length) {
  firebase.initializeApp(firebaseConfig);
}

export const authService = {
  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));

      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async signup(userData) {
    try {
      const response = await apiClient.post('/auth/signup', userData);

      const { token, user } = response.data;
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));

      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  },

  async logout() {
    try {
      await apiClient.post('/auth/logout');
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  },

  async getCurrentUser() {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const token = await AsyncStorage.getItem('authToken');

      if (userData && token) {
        return JSON.parse(userData);
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  async forgotPassword(email) {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  },

  async resetPassword(token, newPassword) {
    try {
      const response = await apiClient.post('/auth/reset-password', {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  },

  async updateProfile(userId, profileData) {
    try {
      const response = await apiClient.put(`/auth/profile/${userId}`, profileData);
      const user = response.data.user;
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  },
};

export default authService;
