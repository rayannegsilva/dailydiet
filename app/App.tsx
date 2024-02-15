
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { Home } from './src/pages/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CreateMeal } from './src/pages/MealCreate';

import { useFonts } from 'expo-font';
import {
  NunitoSans_400Regular,
  NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans';

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Home />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}