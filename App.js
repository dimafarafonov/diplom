import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/home";
import Map from "./screens/map";
import friendReducer from "./FriendReducer";
import * as Permissions from 'expo-permissions';
// import {render} from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(friendReducer);

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createCompatNavigatorFactory } from "@react-navigation/compat";

const Root = createCompatNavigatorFactory(createStackNavigator)(
  {
    Home: { screen: Home },
    Map: { screen: Map }
  },
  {
    initialRouteName: "Home"
  }
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  componentDidMount(){
    this._getLocationAsync()
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
  };

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;

//https://alligator.io/react/react-native-redux/
