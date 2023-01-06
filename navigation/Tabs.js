import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

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
          tabBarLabel: "家",
          tabBarIcon: (color, size) => (
            <FontAwesome5 name="warehouse" size={20} color="#a58224" />
          ),
        }}
        name="main"
        component={Main}
      />

      <Tab.Screen
        options={{
          title: "놀음판",
          tabBarLabel: "놀음판",
          tabBarIcon: (color, size) => (
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
