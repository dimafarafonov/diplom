import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./screens/home";
import Map from "./screens/map";
import friendReducer from './FriendReducer'
// import {render} from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(friendReducer);

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
      initialRouteName: 'Home'
    }
  )

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



//https://alligator.io/react/react-native-redux/