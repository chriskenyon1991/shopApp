import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";

import Home from "./screens/Home";
import Basket from "./screens/Basket";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: "#273469",
            },
            headerTintColor: "#EBF2FA",
            headerRight: () => (
              <Button
                title="\_/"
                onPress={() => navigation.navigate("Basket")}
              ></Button>
            ),
          })}
        />
        <Stack.Screen
          name="Basket"
          component={Basket}
          options={{
            headerStyle: {
              backgroundColor: "#273469",
            },
            headerTintColor: "#EBF2FA",
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
