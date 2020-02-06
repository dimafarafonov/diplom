import React, { Component } from "react";
import MapView from "react-native-maps";
import { StyleSheet,Button,View} from "react-native";
import {withNavigation} from '@react-navigation/compat'
class Map extends Component {
    render() {
        const {navigate}= this.props.navigation
        return (
            <View style={{flex:1}}>
            <MapView style={StyleSheet.absoluteFillObject}
            region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
            </MapView>
            <Button title='Go to home screen' onPress={()=>{navigate('Home')}} color='orange'></Button>
            </View>

        )
    }
}
export default withNavigation(Map)