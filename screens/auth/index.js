import React, { Component } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { ValidationForm, ValidationComponent } from "react-native-validation";
import gerelo from "../../assets/icon.png";
import { _storeData } from "../../reducers/actions";
import { withNavigation } from "@react-navigation/compat";
import { CommonActions } from '@react-navigation/native';
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import {
  changeProps,
  setLastWritings,
  setFetchedUsers,
  getUserName,
} from "../home/actions";
import { _retrieveData } from "../../reducers/actions";
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
      users: [],
      is_valid: false,
    };
    ValidationComponent.setDefaultErrorMessageStyle({
      color: "red",
      fontSize: 10,
    });
  }

  componentDidMount() {
    firebase
      .database()
      .ref("users")
      .on("value", (snapshot) => {
        const users = snapshot.val();
        this.props.setFetchedUsers(users);
        this.setState({ loading: false, users: users });
      });
  }
  componentDidUpdate() {
    if (this.props.auth.have_token) {
      const resetAction =  CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Map' },
        ],
      })
      this.props.navigation.dispatch(resetAction);
    } else {
      this.props.navigation.navigate("Auth");
    }
  }

  checkifUserExist = () => {
    const { login, users } = this.state;
    let match_login = false;
    let match_pib = false;
    if (users != null) {
      Object.entries(users).filter((key, index) => {
        if (key[1].pib == this.state.pib) {
          (match_pib = true), this.setState({ user_id: key[1].id });
        }
      });
      Object.keys(users).filter((key) => {
        if (key == login) {
          match_login = true;
        }
      });
    }
    return match_login && match_pib;
  };
  updateCurrentUser = async (token) => {
    firebase.database().ref(`/users/${this.state.login}`).update({
      token: token,
    });
    // await this.props._storeData(token);
    await this.props._retrieveData(token);
    await this.props.navigation.navigate("Map");
    Alert.alert(
      "Успішно",
      "Ви успішно залогінились",
      { cancelable: false }
    );
    await this.props._storeData(token);
  };
  createNewUser = async (login, pib, token) => {
    await firebase.database().ref(`/users/${login}`).set({
      pib: pib,
      id: uuid(),
      token: token,
    });
    this.props.navigation.navigate("Map");
    this.props._storeData(token);
  };
  static getDerivedStateFromError() {}
  render() {
    const { pib, login } = this.state;
    //spinner for no token   !this.props.auth.have_token
    return !this.props.auth.have_token && !this.props.auth.position.coords ? (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <ValidationForm
        ref={(ref) => {
          this.form = ref;
        }}
        style={{ flex: 1 }}
        onSubmit={() => {
          this.props.setLastWritings(login);
          this.createNewUser(login, pib, uuid());
          Alert.alert(
            "Успішно",
            "Вітаємо з реєстрацією",
            { cancelable: false }
          );
        }}
        onError={() => {
          return 0;
        }}
      >
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
            style={{ bottom: 50, width: 240, height: 240 }}
          />
          <View style={styles.input}>
            <ValidationComponent
              component={
                <TextInput
                  onChangeText={(value) => {
                    this.setState({ login: value });
                  }}
                  onTouchStart={() => this.setState({ is_valid: false })}
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
              }
              errorMessageStyle={{
                color: "red",
                position: "absolute",
              }}
              validators={[
                "required",
                "minStringLength:8",
                "maxStringLength:30",
              ]}
              errorMessages={[
                "*Заповнити обов'язково",
                "мінамільна довжина ніку 8 символів",
                "максимальна довжина ніку 30 символів",
              ]}
            ></ValidationComponent>
          </View>
          {!this.state.is_valid ? null : (
            <Text
              style={{ color: "red", position: "absolute", top: 30, left: 20 }}
            >
              Ваш логін не чи піб не унікальні, якщо ви хочете просто ввійти,
              введіть коректні данні
            </Text>
          )}
          <ValidationComponent
            style={styles.input}
            component={
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
            }
            errorMessageStyle={{
              color: "red",
              position: "absolute",
            }}
            validators={["required", "minStringLength:8", "maxStringLength:30"]}
            errorMessages={[
              "*Заповнити обов'язково",
              "мінамільна довжина імені 8 символів",
              "максимальна довжина імені 30 символів",
            ]}
          ></ValidationComponent>
          <View style={{ top: 10 }}>
            <Button
              title={"Зареєструватися"}
              buttonStyle={{
                top: 25,
                borderRadius: 20,
                backgroundColor: "#465880",
                borderColor: "#ced4da",
                borderWidth: 2,
              }}
              onPress={() => {
                if (this.checkifUserExist()) {
                  this.updateCurrentUser(uuid());
                  // this.setState({ is_valid: true });
                  return;
                } else {
                  this.form.validate();
                }
              }}
            />
          </View>
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
          {/* <Button
            title={"Подивитися що в базі - Додому"}
            buttonStyle={{
              width: "90%",
              left: 20,
            }}
            onPress={() => {
              this.props.navigation.navigate("Home");
            }}
          /> */}
          {/* <Button
            title={"checkifExists"}
            buttonStyle={{
              width: "90%",
              left: 20,
            }}
            onPress={() => {
              this.checkifUserExist();
            }}
          /> */}
        </View>
      </ValidationForm>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
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
  const { auth, home } = state;
  return { auth, home };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changeProps,
      setLastWritings,
      setFetchedUsers,
      _storeData,
      _retrieveData,
    },
    dispatch
  );
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Auth)
);
