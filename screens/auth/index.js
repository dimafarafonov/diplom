import React, { Component } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  View,
  AsyncStorage,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import gerelo from "../../assets/gerelo.png";
import * as Location from "expo-location";
import { withNavigation } from "@react-navigation/compat";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { changeProps, setLastWritings } from "../home/actions";
import { bindActionCreators } from "redux";
import * as firebase from "firebase";
import uuid from "uuid-random";
class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      pib: "",
      loading: true,
    };
  }

  componentDidMount() {
    console.log("auth mounted");

    this.setState({ loading: false });
  }
  componentDidUpdate() {
    // this.props.auth.have_token
    //   ? this.props.navigation.navigate("Home")
    //   : null;
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
    console.log("this.props.Auth", this.props.auth.have_token);
    const { pib, login } = this.state;
    return !this.props.auth.have_token ? (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "#04405a",
            alignItems: "center",
            // borderColor: "red",
            // borderWidth: 2,
            flex: 1,
          }}
        >
          <Image
            source={gerelo}
            style={{bottom: 40,width:240,height:65 }}
          />
          <View style={styles.input}>
            <TextInput
              onChangeText={(value) => {
                this.setState({ login: value });
              }}
              multiline={true}
              numberOfLines={1}
              value={this.state.login}
              placeholder={"Введіть логін"}
              textAlignVertical={"top"}
              style={{ padding: 10, paddingBottom: 5 }}
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
              numberOfLines={1}
              value={this.state.pib}
              placeholder={"Прізвище Імя по батькові"}
              textAlignVertical={"top"}
              style={{ padding: 10, paddingBottom: 5 }}
              onFocus={() => {
                this.setState({ activeDesc: true });
              }}
              onBlur={() => {
                this.setState({ activeDesc: false });
              }}
            />
          </View>
          <Button
            title={"Зареєструватися"}
            buttonStyle={{
             top:25,
             borderRadius:20,
             backgroundColor: "#465880",
             borderColor: "#ced4da",
             borderWidth: 2,
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
        <View
          style={{
            // borderColor: "orange",
            // borderWidth: 2,
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <Button
            title={"Подивитися що в базі - Додому"}
            buttonStyle={{
              width: "90%",
              left: 20,
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
    marginBottom: 10,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    width: "90%",
    backgroundColor: "#465880",
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
