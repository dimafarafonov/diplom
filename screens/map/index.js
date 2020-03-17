import React, { Component } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Button, View } from "react-native";
import * as Location from "expo-location";
import { withNavigation } from "@react-navigation/compat";
import { connect } from "react-redux";
import { changeProps } from "../../FriendActions";
import { bindActionCreators } from "redux";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };
  }

  async componentDidMount() {
    let location = await Location.getCurrentPositionAsync({});
    console.log("app.js location", location);
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
  }

  render() {
    //console.log(this.props.example)
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          region={this.state}
        showsUserLocation={true}

        ></MapView>
        <Button
          title="Go to home screen"
          onPress={() => {
            this.props.changeProps("from Map"), navigate("Home");
          }}
          color="orange"
        ></Button>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { example } = state;
  return { example };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeProps
    },
    dispatch
  );
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Map)
);
