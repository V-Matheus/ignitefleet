import 'react-native-get-random-values';
import './src/libs/dayjs';
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
import { AppProvider, UserProvider } from '@realm/react';
import { Routes } from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RealmProvider } from './src/libs/realm';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoaded) return <Loading />;

  return (
    <AppProvider
      id={process.env.EXPO_PUBLIC_REALM_APP_ID || 'default-realm-app-id'}
    >
      <ThemeProvider theme={theme}>
        <SafeAreaProvider
          style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <UserProvider fallback={SignIn}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
