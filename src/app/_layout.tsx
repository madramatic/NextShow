
import { Stack } from 'expo-router';
import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

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

  return <Stack />;
}
