import React, { Component } from "react";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";

import { StyleSheet, Button, View } from "react-native";
import * as Location from "expo-location";
import Seacrh from "./components/search";
import { withNavigation } from "@react-navigation/compat";
import { connect } from "react-redux";
import { changeProps } from "../home/actions";
import { bindActionCreators } from "redux";
import * as firebase from "firebase";
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
      locations: [],
      radius: 0,
    };
  }
  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  searchByRadius = (radius) => {
    this.setState({ radius });
  };
  getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  async componentDidMount() {
    if (this.props.auth.locations != {}) {
      await this.setState({
        locations: Object.entries(this.props.auth.locations),
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log("app.js location", location);
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  render() {
    const { locations, latitude, longitude } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          region={this.state}
          showsUserLocation={true}
        >
          {locations.map((marker, index) =>
            this.getDistance(
              latitude,
              longitude,
              marker[1].coords.latitude,
              marker[1].coords.longitude
            ) <
            this.state.radius / 1000 ? (
              <Marker
                style={{ zIndex: 999, position: "absolute" }}
                key={index}
                coordinate={marker[1].coords}
                title={marker[1].title}
                description={marker[1].description}
              />
            ) : null
          )}
          <MapView.Circle
            style={{ position: "absolute" }}
            center={this.state}
            radius={this.state.radius}
            strokeWidth={1}
            strokeColor="#3399ff"
            fillColor="rgba(120,120,120,0.5)"
            zIndex={9999}
          />
        </MapView>

        <Button
          title="Go to home screen"
          onPress={() => {
            this.props.changeProps("from Map"),
              this.props.navigation.navigate("Home");
          }}
          color="orange"
        ></Button>
        <Seacrh searchByRadius={this.searchByRadius} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { map, auth } = state;
  return { map, auth };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changeProps,
    },
    dispatch
  );
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Map)
);
