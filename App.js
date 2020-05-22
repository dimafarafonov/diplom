import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import Home from "./screens/home";
import Map from "./screens/map";
import Auth from "./screens/auth";
import LocationCreate from "./screens/location_create";
import LocationList from "./screens/location_list";
import LocationProfile from "./screens/location_profile";
import LocationEdit from "./screens/location_list/components/location_edit";
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
  _getComments,
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
    LocationEdit: LocationEdit,
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
    try {
      const location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      store.dispatch(_getCurrentPosition(location));
    } catch (error) {
      store.dispatch(
        _getCurrentPosition({
          coords: {
            accuracy: 35.071998596191406,
            altitude: 240.70001220703125,
            heading: 0,
            latitude: 50.2427717,
            longitude: 28.7031313,
            speed: 0,
          },
          mocked: false,
          timestamp: 1589830163204,
        })
      );
    }
  };
  getLocations = () => {
    firebase
      .database()
      .ref("locations")
      .on("value", (snapshot) => {
        let locations = snapshot.val();
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

      if (value !== null) {
        store.dispatch(_retrieveData(value));
      } else {
        console.log("this is works that means user have no");
        // store.dispatch(_storeData(value));
      }
      return;
    } catch (error) {
      return;
    }
  };

  async componentDidMount() {
    await this.getComments();
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
