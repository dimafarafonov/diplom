import React, { Component } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Button, View, Image } from "react-native";
import * as Location from "expo-location";
import { withNavigation } from "@react-navigation/compat";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setCoords } from "../../actions";
class MiniMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
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
    let array = {};
    return (
      <View style={{ height: 220, width: "100%", bottom: 0 }}>
        <MapView
          style={{ height: "100%", width: "100%" }}
          region={this.state}
          onRegionChangeComplete={(region) => {
            array = {
              longitude: region.longitude,
              latitude: region.latitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            };
            this.props.setCoords(array);
            this.setState(array);
          }}
        ></MapView>
        <View style={{ position: "absolute", left: "47%", top: "38%" }}>
          <Image
            style={{ position: "absolute" }}
            source={require("../../../../assets/marker.png")}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { location_create } = state;
  return { location_create };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setCoords,
    },
    dispatch
  );
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(MiniMap)
);
