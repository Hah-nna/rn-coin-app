import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stacks from "./Stacks";
import Tabs from "./Tabs";
import Main from "../screen/Main";
import Detail from "../screen/Detail";

const Stack = createNativeStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="tabs" component={Tabs} />
      <Stack.Screen name="Stacks" component={Stacks} />
    </Stack.Navigator>
  );
}
