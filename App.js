import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import Home from "./screens/home";
import Map from "./screens/map";
import Auth from "./screens/auth";
import LocationCreate from "./screens/location_create";
import LocationList from "./screens/location_list";
import LocationProfile from "./screens/location_profile";
import firebaseConfig from "./config/firebase";
import reducer from "./reducers/index.js";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
import * as Location from "expo-location";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  _storeData,
  _retrieveData,
  _removeData,
  _getLocations,
  _getCurrentPosition,
  _getComments
} from "./reducers/actions";
import { Provider } from "react-redux";

const store = createStore(reducer, applyMiddleware(thunk));
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createCompatNavigatorFactory } from "@react-navigation/compat";

const Root = createCompatNavigatorFactory(createStackNavigator)(
  {
    Auth: Auth,
    Home: Home,
    Map: Map,
    LocationCreate: LocationCreate,
    LocationList: LocationList,
    LocationProfile: LocationProfile,
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
  getCurrentPosition = async () => {
    let location = await Location.getCurrentPositionAsync({});
    // console.log("app.js location", location);
    store.dispatch(_getCurrentPosition(location));
  };
  getLocations = () => {
    firebase
      .database()
      .ref("locations")
      .on("value", (snapshot) => {
        const locations = snapshot.val();
        store.dispatch(_getLocations(locations));
      });
  };

  getComments = () => {
    firebase
      .database()
      .ref("comments")
      .on("value", (snapshot) => {
        const comments = snapshot.val();
        store.dispatch(_getComments(comments));
      });
  };
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("UNIQUE");
      console.log("Unique", value);

      if (value !== null) {
        store.dispatch(_retrieveData(value));
      } else {
        store.dispatch(_storeData(value));
      }
    } catch (error) {}
  };

  async componentDidMount() {
    await this.getComments()
    await this.getLocations();
    await this.retrieveData();
    await this._getLocationAsync();
    await this.getCurrentPosition();
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
