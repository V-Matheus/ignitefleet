import React from 'react';
import { SignIn } from './src/screens/SignIn';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import Loading from './src/components/Loading';
import { StatusBar } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoaded) return <Loading />;

  const EXPO_PUBLIC_ANDROID_CLIENT_ID =
    process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID;

  console.log(
    'EXPO_PUBLIC_ANDROID_CLIENT_ID => ',
    EXPO_PUBLIC_ANDROID_CLIENT_ID,
  );

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <SignIn />
    </ThemeProvider>
  );
}
