import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

import "./global.css";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "quicksand": require("../assets/fonts/Quicksand-Regular.ttf"),
    "quicksand-bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "quicksand-semibold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "quicksand-light": require("../assets/fonts/Quicksand-Light.ttf"),
    "quicksand-medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "rubik-extrabold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
