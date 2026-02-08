import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useRef } from "react";
import { QueryClientProvider } from '@tanstack/react-query';

import "./global.css";
import { queryClient } from "@/services/config";
import { AuthProvider } from "@/context/auth";
import { AddressProvider } from "@/context/address";
import { FoodDetailsSheetProvider } from "@/context/food/FoodDetailsSheetContext";
import FoodDetailsSheet, { FoodDetailsSheetRef } from "@/components/FoodDetailsSheet";

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "quicksand": require("../assets/fonts/Quicksand-Regular.ttf"),
    "quicksand-bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "quicksand-semibold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "quicksand-light": require("../assets/fonts/Quicksand-Light.ttf"),
    "quicksand-medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "rubik-extrabold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
  });

  const foodDetailsSheetRef = useRef<FoodDetailsSheetRef>(null);

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AddressProvider>
          <FoodDetailsSheetProvider foodDetailsSheetRef={foodDetailsSheetRef}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack screenOptions={{ headerShown: false }} />
              <FoodDetailsSheet ref={foodDetailsSheetRef} />
            </GestureHandlerRootView>
          </FoodDetailsSheetProvider>
        </AddressProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
