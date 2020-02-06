import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./screens/home";
import Map from "./screens/map";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { createCompatNavigatorFactory } from "@react-navigation/compat";
export default function App() {

  const Root = createCompatNavigatorFactory(createStackNavigator)(
    {
      Home: { screen: Home },
      Map: { screen: Map },
    },
    {
      initialRouteName:'Home'
    }
  )

  return (
    <NavigationContainer>
      <Root/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
