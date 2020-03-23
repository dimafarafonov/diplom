import React, { Component } from "react";
import { Text, View, Button, Alert } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigation } from "@react-navigation/compat";
import * as firebase from "firebase";
import { changeProps } from "../../FriendActions";
class Home extends Component {
  constructor(props) {
    super(props);
  }
//   componentDidMount() {
//     var db = firebase
//       .database()
//       .ref("users")
//       .on("value", num => {
//         console.log("num", num);
//       });
//   }
  setupHighscoreListener = userId => {
    firebase
      .database()
      .ref("users " + this.props.example.login)
      .on("value", snapshot => {
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
  //   setupHighscoreListener = userId => {
  //     firebase
  //       .database()
  //       .ref("users " + this.props.example.login)
  //       .on("value", snapshot => {
  //         const pib = snapshot;
  //         Alert.alert(
  //             "Останній записанйи користувач логін",
  //             `${this.props.example.login}`,
  //             [
  //               { text: "OK", onPress: () => console.log("OK") }
  //             ],
  //             { cancelable: false }
  //           );
  //         console.log("New high score: " + JSON.stringify(pib));
  //       });
  //   };

  render() {
    // console.log(this.props.example)
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to map screen"
          onPress={() => {
            this.props.changeProps(" fromHome"), navigate("Map");
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

const mapStateToProps = state => {
  console.log("state Home", state);
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
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
