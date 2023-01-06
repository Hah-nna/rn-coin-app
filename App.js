import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import Root from "./navigation/Root";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const getFonts = () =>
  Font.loadAsync({
    "SongMyung-Regular": require("./assets/fonts/SongMyung-Regular.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts} // 요구된 data 및 asset을 미리 로드한다.
        onFinish={() => setFontsLoaded(true)} //startAsync가 끝났을 때 실행되고, 다시 렌더링이 일어난다.
        onError={console.warn} // startAsync 에서 오류 발생 시 실행
      />
    );
  }
}
