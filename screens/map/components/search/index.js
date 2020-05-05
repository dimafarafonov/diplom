import React, { Component } from "react";

import { StyleSheet, Button, View } from "react-native";

import { withNavigation } from "@react-navigation/compat";
import { connect } from "react-redux";
import { changeProps } from "../../../home/actions";
import { bindActionCreators } from "redux";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {
    return (
      <View style={{ width:'100%',bottom:0,position:'absolute',justifyContent:'space-evenly',flexDirection:'row' }}>
        <Button title="500м" color="grey" onPress={()=>this.props.searchByRadius(500)}></Button>
        <Button title="1000м" color="green" onPress={()=>this.props.searchByRadius(1000)}></Button>
        <Button title="2000м" color="black" onPress={()=>this.props.searchByRadius(2000)}></Button>
        <Button title="5000м" color="orange" onPress={()=>this.props.searchByRadius(5000)}></Button>
        <Button title="10000м" color="red" onPress={()=>this.props.searchByRadius(10000)}></Button>
        <Button title="Clear" color="lightgrey" onPress={()=>this.props.searchByRadius(0)}></Button>
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
  connect(mapStateToProps, mapDispatchToProps)(Search)
);
