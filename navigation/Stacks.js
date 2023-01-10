import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import Detail from "../screen/Detail";

const Stack = createNativeStackNavigator();

export default function Stacks({ navigation: { goBack } }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontFamily: "SongMyung-Regular" },
        headerTitle: "엽전 상세보기",
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: "#a58224" }}>과거로</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="detail" component={Detail} />
    </Stack.Navigator>
  );
}
