import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  useWindowDimensions,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

const SplashScreenComponent = () => {
  const { width, height } = useWindowDimensions();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={[styles.container, { width, height }]}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Animated.Text style={[styles.appName, { opacity: fadeAnim }]}>
          Cricket Pro
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1976d2',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
});

export default SplashScreenComponent;
