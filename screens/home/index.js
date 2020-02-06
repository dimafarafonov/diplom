import React, { Component } from "react";
import { Text,View,Button} from "react-native";
import {withNavigation} from "@react-navigation/compat";
class Home extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const {navigate} =this.props.navigation
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button title='Go to map screen' onPress={()=>{navigate('Map')}}></Button>
            </View>
        )
    }
}
export default withNavigation(Home)