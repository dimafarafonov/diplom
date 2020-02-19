import React, { Component } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Button, View } from "react-native";
import { withNavigation } from '@react-navigation/compat'
import { connect } from "react-redux";
import {changeProps} from "../../FriendActions";
import {bindActionCreators} from "redux";
class Map extends Component {
    render() {
        //console.log(this.props.example)
        const { navigate } = this.props.navigation
        return (    
            <View style={{ flex: 1 }}>
                <MapView style={StyleSheet.absoluteFillObject}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}>
                </MapView>
                <Button title='Go to home screen' onPress={() => {this.props.changeProps('from Map'), navigate('Home') }} color='orange'></Button>
            </View>

        )
    }
}


const mapStateToProps = (state) => {
    const { example } = state
    return { example }
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        changeProps,
    },dispatch)
)
export default withNavigation(connect(mapStateToProps,mapDispatchToProps)(Map))