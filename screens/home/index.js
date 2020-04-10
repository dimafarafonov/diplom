import React, { Component } from "react";
import { Text, View, Button, Alert } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigation } from "@react-navigation/compat";
import * as firebase from "firebase";
import { changeProps } from "./actions";
class Home extends Component {
  constructor(props) {
    super(props);
  }

  setupHighscoreListener = (userId) => {
    firebase
      .database()
      .ref("users " + this.props.home.login)
      .on("value", (snapshot) => {
        const pib = JSON.stringify(snapshot, null, 2);
        Alert.alert(
          "Останній записанйи користувач логін",
          `${pib}`,
          [{ text: "OK", onPress: () => console.log("OK") }],
          { cancelable: false }
        );
        console.log("New high score: " + JSON.stringify(pib));
      });
  };

  render() {
    // console.log("this.props.Home", this.props.home.users);
    // console.log("this.props.auth", this.props.auth);
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <Text>Home Screen</Text>
        <Button
          title="Go to map screen"
          onPress={() => {
            this.props.changeProps(" fromHome"),
              this.props.navigation.navigate("Map");
          }}
        ></Button>
        <Button
          title="Записатися ще раз"
          onPress={() => {
            this.props.navigation.navigate("Auth");
          }}
        ></Button>
        <Button
          title="Виведіть останні дані з бази "
          onPress={() => {
            this.setupHighscoreListener();
          }}
        ></Button>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("state Home", state);
  const { home, auth } = state;
  return { home, auth };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changeProps,
    },
    dispatch
  );
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
