
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useFonts } from 'expo-font';
import {
  NunitoSans_400Regular,
  NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans';

import { Routes } from './src/routes';
import { AuthProvider } from './src/hooks/auth';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/lib/react-query';

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes />
          </QueryClientProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}