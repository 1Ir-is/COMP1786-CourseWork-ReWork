import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import Database from "./Database";
import DetailScreen from "./screens/DetailScreen";
import EntryScreen from "./screens/EntryScreen";
import HomeScreen from "./screens/HomeScreen";
import UpdateScreen from "./screens/UpdateScreen";
const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    Database.initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add new hike" component={EntryScreen} />
        <Stack.Screen name="Information Detail" component={DetailScreen} />
        <Stack.Screen name="Update Information" component={UpdateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;