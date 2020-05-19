import React, { Component } from "react";
import { Text, View, Button, Alert, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigation } from "@react-navigation/compat";
import * as firebase from "firebase";
import { changeProps, getUserName } from "./actions";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.home.users,
    };
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
          { cancelable: false }
        );
      });
  };

  async componentDidMount() {
    let token = await AsyncStorage.getItem("UNIQUE")

    const { users } = this.state;
    if (users != null) {
      Object.entries(users).filter((key, index) => {
        if (key[1].token == token) {
          this.setState({ user_id: key[1].id });
          this.props.getUserName(key[1].id);
        }
      });
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <Button
          title="Go to map screen"
          onPress={() => {
            // this.props.changeProps(" fromHome"),
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
        <Button
          title="Створити локацію"
          onPress={() => {
            this.props.navigation.navigate("LocationCreate");
          }}
        ></Button>
        <Button
          title="Мої локації"
          onPress={() => {
            this.props.navigation.navigate("LocationList");
          }}
        ></Button>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { home, auth } = state;
  return { home, auth };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changeProps,
      getUserName,
    },
    dispatch
  );
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
