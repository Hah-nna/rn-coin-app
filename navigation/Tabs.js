import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Main from "../screen/Main";
import Board from "../screen/Board";
import { useColorScheme } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          title: "어서오세요.",
          headerTitleStyle: { fontFamily: "SongMyung-Regular" },
          headerTitleAlign: "center",
          tabBarLabel: "家",
          tabBarIcon: () => <FontAwesome5 name="warehouse" size={20} color="#a58224" />,
          headerTintColor: isDark ? "white" : "black",
          headerStyle: {
            backgroundColor: isDark ? "#273c75" : "white",
          },
          tabBarStyle: {
            backgroundColor: isDark ? "#273c75" : "white",
          },
        }}
        name="main"
        component={Main}
      />

      <Tab.Screen
        options={{
          title: "놀음판",
          headerTitleStyle: { fontFamily: "SongMyung-Regular" },
          headerTitleAlign: "center",
          tabBarLabel: "놀음판",
          tabBarIcon: () => <MaterialCommunityIcons name="poker-chip" size={24} color="#a58224" />,
          headerTintColor: isDark ? "white" : "black",
          headerStyle: {
            backgroundColor: isDark ? "#273c75" : "white",
          },
          tabBarStyle: {
            backgroundColor: isDark ? "#273c75" : "white",
          },
        }}
        name="board"
        component={Board}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
