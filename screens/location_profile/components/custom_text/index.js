import React, { Component } from "react";
import { Text as TextRN, View } from "react-native";

export default class MyText extends Component {
  render() {
    return (
      <View>
        <TextRN style={{ fontSize: 17, left: 5, top: 10,fontFamily:'sans-serif-condensed' }}>
          {this.props.children}
        </TextRN>
      </View>
    );
  }
}
