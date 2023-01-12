import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import Detail from "../screen/Detail";
import { useColorScheme } from "react-native";

const Stack = createNativeStackNavigator();

export default function Stacks({ navigation: { goBack } }) {
  const isDark = useColorScheme() === "dark";

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontFamily: "SongMyung-Regular" },
        headerTitle: "엽전 상세보기",
        headerTitleAlign: "center",
        headerTintColor: isDark ? "white" : "black",
        headerStyle: {
          backgroundColor: isDark ? "#273c75" : "white",
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: isDark ? "white" : "black" }}>과거로</Text>
            {/* text color 잘 안 보이는데, 변경할 지 말지 */}
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen name="detail" component={Detail} />
    </Stack.Navigator>
  );
}
