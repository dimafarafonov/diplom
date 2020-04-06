import React, { Component } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  Button,
  View,
  AsyncStorage,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { withNavigation } from "@react-navigation/compat";
import { connect } from "react-redux";
import { changeProps, setLastWritings } from "../home/actions";
import { bindActionCreators } from "redux";
import * as firebase from "firebase";
import uuid from "uuid-random";
class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "non-login",
      pib: "non-pib",
      loading: true,
    };
  }

  componentDidMount() {
    console.log('auth mounted')

    this.setState({ loading: false });
  }
  componentDidUpdate(){
    this.props.auth.have_token
      ? this.props.navigation.navigate("Home")
      : null;
  }

  storeHighScore = (login, pib) => {
    firebase
      .database()
      .ref("users " + login)
      .set({
        pib: pib,
        id: uuid(),
      });
  };
  static getDerivedStateFromError() {}
  render() {
     console.log('this.props.Auth',this.props.auth.have_token)
    const { pib, login } = this.state;
    return !this.props.auth.have_token ? (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <View style={{ marginTop: 40 }}>
        <View style={styles.input}>
          <TextInput
            onChangeText={(value) => {
              this.setState({ login: value });
            }}
            multiline={true}
            numberOfLines={6}
            value={this.state.login}
            placeholder={"Введіть логін"}
            textAlignVertical={"top"}
            style={{ padding: 5 }}
            onFocus={() => {
              this.setState({ activeDesc: true });
            }}
            onBlur={() => {
              this.setState({ activeDesc: false });
            }}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            onChangeText={(value) => {
              this.setState({ pib: value });
            }}
            multiline={true}
            numberOfLines={6}
            value={this.state.pib}
            placeholder={"Прізвище Імя по батькові"}
            textAlignVertical={"top"}
            style={{ padding: 5 }}
            onFocus={() => {
              this.setState({ activeDesc: true });
            }}
            onBlur={() => {
              this.setState({ activeDesc: false });
            }}
          />
        </View>

        <View>
          <Button
            title={"Зберегти в базу"}
            buttonStyle={{
              backgroundColor: "#33b5e5",
              width: "96%",
              marginTop: 20,
              bottom: 5,
              left: 7,
            }}
            onPress={() => {
              this.props.setLastWritings(login);
              this.storeHighScore(login, pib);
              Alert.alert(
                "Успішно",
                "Ви записали нового користувача в базу даних",
                [
                  {
                    text: "Ask me later",
                    onPress: () => console.log("Ask me later pressed"),
                  },
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "OK", onPress: () => console.log("OK") },
                ],
                { cancelable: false }
              );
            }}
          />
        </View>
        <View>
          <Button
            title={"Подивитися що в базі - Додому"}
            buttonStyle={{
              backgroundColor: "#33b5e5",
              width: "96%",
              marginTop: 20,
              bottom: 5,
              left: 7,
            }}
            onPress={() => {
              this.props.navigation.navigate("Home");
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    backgroundColor: "transparent",
    borderColor: "#ced4da",
    borderWidth: 2,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

const mapStateToProps = (state) => {
  // console.log("state Auth", state);
  const { auth } = state;
  return { auth };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changeProps,
      setLastWritings,
    },
    dispatch
  );
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Auth)
);
