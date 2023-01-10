import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import Root from "./navigation/Root";
import { setCustomText } from "react-native-global-props";
import * as SplashScreen from "expo-splash-screen";
import { loadAsync } from "expo-font";
import { QueryClient, QueryClientProvider } from "react-query";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      await loadAsync({
        "SongMyung-Regular": require("./assets/fonts/SongMyung-Regular.otf"),
      });
      setAppIsReady(true);
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    onLayoutRootView();
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const customTextProps = {
    style: {
      fontFamily: "SongMyung-Regular",
    },
  };

  setCustomText(customTextProps);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
