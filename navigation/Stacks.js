import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
import Detail from "../screen/Detail";

const Stack = createNativeStackNavigator();

export default function Stacks({ navigation: { goBack } }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "left",
        headerTintColor: "#1abc9c",
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: "#1abc9c" }}>⬅</Text>
            {/*삼항연산자는 그 자체가 하나의 값으로 참조되기 때문에 key:value
        형태로 바로 넣을 수 있음.*/}
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen name="detail" component={Detail} />
    </Stack.Navigator>
  );
}
