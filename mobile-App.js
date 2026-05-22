import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './src/store';
import { useAppTheme } from './src/hooks/useTheme';
import SplashScreen from './src/screens/SplashScreen';
import AuthNavigator from './src/navigation/AuthNavigator';
import MainNavigator from './src/navigation/MainNavigator';
import { authService } from './src/services/authService';
import * as SplashScreenModule from 'expo-splash-screen';

SplashScreenModule.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useAppTheme();

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (e) {
      console.error('Error bootstrapping app:', e);
    } finally {
      setIsLoading(false);
      SplashScreenModule.hideAsync();
    }
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        {user ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </Provider>
  );
}
