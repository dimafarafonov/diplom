import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import Home from "./screens/home";
import Map from "./screens/map";
import Auth from "./screens/auth";
import firebaseConfig from "./config/firebase";
import reducer from "./reducers/index.js";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { _storeData, _retrieveData } from "./reducers/actions";
import { Provider } from "react-redux";

const store = createStore(reducer, applyMiddleware(thunk));
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, StackActionss } from "@react-navigation/native";
import { createCompatNavigatorFactory } from "@react-navigation/compat";

const Root = createCompatNavigatorFactory(createStackNavigator)(
  {
    Auth: Auth,
    Home: Home,
    Map: Map,
  },
  {
    initialRouteName: "Auth",
    headerMode: "none",
  }
);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // storeData = async () => {
  //   try {
  //     await AsyncStorage.setItem("UNIQUE", "dev_gerelo");
  //   } catch (error) {
  //     // Error saving data
  //   }
  // };

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("UNIQUE");
      if (value !== null) {
        store.dispatch(_retrieveData(value));
      } else {
        store.dispatch(_retrieveData(false));
      }
    } catch (error) {}
  };

  componentDidMount() {
    this.retrieveData();
    this._getLocationAsync();
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
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
