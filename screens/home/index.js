import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigation } from "@react-navigation/compat";
import { changeProps } from '../../FriendActions'
class Home extends Component {
    constructor(props) {
        super(props)
    }
    render() {
       // console.log(this.props.example)
        const { navigate } = this.props.navigation
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button title='Go to map screen' onPress={() => { this.props.changeProps(' fromHome'),navigate('Map') }}></Button>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { example } = state
    return { example }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        changeProps,
    },dispatch)
)
export default withNavigation(connect(mapStateToProps,mapDispatchToProps)(Home))