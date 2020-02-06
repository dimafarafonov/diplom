import React, { Component } from "react";
import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
class Map extends Component {
    render() {
        return (
            <MapView style={StyleSheet.absoluteFillObject}
            
            region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}/>
        )
    }
}
export default Map