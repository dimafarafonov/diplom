import React, { Component } from "react";
import {  Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { StyleSheet, Button, View } from "react-native";
import * as Location from "expo-location";
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
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
      locations: Object.entries(this.props.auth.locations),
    };
  }

  async componentDidMount() {
    let location = await Location.getCurrentPositionAsync({});
    // console.log("app.js location", location);
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  render() {
    const { locations } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          region={this.state}
          showsUserLocation={true}
        >
          {locations.map((marker,index) => (
            // console.log("marker", marker)
            <Marker
              key={index}
              coordinate={marker[1].coords}
              title={marker[1].title}
              description={marker[1].description}
            />
          ))}
        </MapView>
        <Button
          title="Go to home screen"
          onPress={() => {
            this.props.changeProps("from Map"),
              this.props.navigation.navigate("Home");
          }}
          color="orange"
        ></Button>
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
