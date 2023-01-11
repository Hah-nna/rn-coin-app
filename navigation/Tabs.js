import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Main from "../screen/Main";
import Board from "../screen/Board";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          title: "어서오세요.",
          headerTitleAlign: "center",
          tabBarLabel: "家",
          tabBarIcon: () => (
            <FontAwesome5 name="warehouse" size={20} color="#a58224" />
          ),
        }}
        name="main"
        component={Main}
      />

      <Tab.Screen
        options={{
          title: "놀음판",
          headerTitleAlign: "center",
          tabBarLabel: "놀음판",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="poker-chip"
              size={24}
              color="#a58224"
            />
          ),
        }}
        name="board"
        component={Board}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
