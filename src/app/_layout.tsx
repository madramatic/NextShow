

import { Stack } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import BottomNavBar from '../presentation/components/BottomNavBar/BottomNavBar';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-Light': require('../../assets/fonts/Poppins/Poppins-Light.ttf'),
    'Poppins-Italic': require('../../assets/fonts/Poppins/Poppins-Italic.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack />
      <BottomNavBar />
    </View>
  );
}
