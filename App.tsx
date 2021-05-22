import * as React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/pages/Home";
import Clases from "./src/pages/Clases";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ title: "INICIO", headerTitleAlign: "center" }}
          name="/"
          component={Home}
        />
        <Stack.Screen
          options={{
            title: "CLASE",
            headerTitleAlign: "center",
            headerShown: false,
          }}
          name="/clases"
          component={Clases}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
