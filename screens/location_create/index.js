import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  AsyncStorage,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import { RadioButton } from "react-native-paper";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { withNavigation } from "@react-navigation/compat";
import { ValidationForm, ValidationComponent } from "react-native-validation";
import { Button } from "react-native-elements";
import MiniMap from "./components/mini_map";
import * as firebase from "firebase";
import uuid from "uuid-random";
const { height, width } = Dimensions.get("screen");
class LocationCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      users: this.props.home.users,
      token: "",
      user_id: this.props.home.username,
      image: null,
      water_rate: "",
      labs_results: "",
      togoal_distance: "",
      water_speed: "",
      if_queue: "",
      checked: "Ні",
    };
  }
  async componentDidMount() {
    this.getPermissionAsync();
    this.setState({ token: await AsyncStorage.getItem("UNIQUE") });
    const { users } = this.state;
    if (users != null) {
      Object.entries(users).filter((key, index) => {
        if (key[1].token == this.state.token)
          this.setState({ user_id: key[1].id });
      });
    }
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  uploadImage = () => {
    firebase
      .storage()
      .ref()
      .child("images/" + this.state.image);
  };
  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.cancelled) {
        const img = `data:image/png;base64,${result.base64}`;
        this.setState({ image: img });
      }

      // this.setState({ image: result.base64 });
    } catch (E) {}
  };
  render() {
    let { image } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ValidationForm
          ref={(ref) => {
            this.form = ref;
          }}
          form={{}}
          style={{ height: "100%", top: 0, position: "relative" }}
          onSubmit={() => {
            this.props.navigation.push("Map");
            Alert.alert(
              "Успішно",
              "Ваш автомобіль додано",
              [
                {
                  text: "OK",
                  onPress: () => {
                    firebase
                      .database()
                      .ref(`/locations/${this.state.title}`)
                      .set({
                        coords: this.props.location_create.coords,
                        title: this.state.title,
                        description: this.state.description,
                        location_id: uuid(),
                        user_id: this.state.user_id,
                        water_rate: this.state.water_rate,
                        image: this.state.image,
                        labs_results: this.state.labs_results,
                        togoal_distance: this.state.togoal_distance,
                        if_queue: this.state.checked,
                        water_speed: this.state.water_speed,
                      });
                  },
                },
              ],
              { cancelable: false }
            );
          }}
          onError={(error) => {
            return 0;
          }}
        >
          <ScrollView>
            <MiniMap />
            <View
              style={{
                justifyContent: "center",
                flexDirection: "column",
                backgroundColor: "grey",
                alignItems: "center",
                // borderColor: "red",
                // borderWidth: 2,
                flex: 1,
              }}
            >
              <Text style={{ color: "white", fontSize: 20, bottom: 0 }}>
                Ваше авто
              </Text>
              <View style={styles.input}>
                <ValidationComponent
                  component={
                    <TextInput
                      onChangeText={(value) => {
                        this.setState({ title: value });
                      }}
                      onTouchStart={() => this.setState({ is_valid: false })}
                      multiline={true}
                      numberOfLines={1}
                      value={this.state.title}
                      placeholder={"Введіть марку Авто"}
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
                    "minStringLength:2",
                    "maxStringLength:30",
                  ]}
                  errorMessages={[
                    "*Заповнити обов'язково",
                    "мінамільна довжина назви 5 символів",
                    "максимальна довжина назви 30 символів",
                  ]}
                ></ValidationComponent>
              </View>
              {/* {!this.state.is_valid ? null : (
                <Text style={{ color: "red", position: "absolute" }}>
                  Ваш логін не унікальний
                </Text>
              )} */}
              <ValidationComponent
                style={styles.input}
                component={
                  <TextInput
                    onChangeText={(value) => {
                      this.setState({ water_rate: value });
                    }}
                    multiline={true}
                    numberOfLines={1}
                    value={this.state.water_rate}
                    placeholder={"Модель авто / рік"}
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
                validators={["required", "minStringLength:4", "maxStringLength:10"]}
                errorMessages={[
                  "*Заповнити обов'язково ",
                  "Мінімальна довжина номеру 4 символи",
                  "Максимальна довжина номеру 10 символів",
                ]}
              ></ValidationComponent>
              <ValidationComponent
                style={styles.input}
                component={
                  <TextInput
                    onChangeText={(value) => {
                      this.setState({ togoal_distance: value });
                    }}
                    multiline={true}
                    numberOfLines={3}
                    value={this.state.togoal_distance}
                    placeholder={"Колір"}
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
                  "minStringLength:5",
                  "maxStringLength:20",
                ]}
                errorMessages={[
                  "*Заповнити обов'язково  ",
                  "Мінімальна довжина 5 символів",
                  "Максимальна довжина 20 символів",
                ]}
              ></ValidationComponent>
              <ValidationComponent
                style={styles.input}
                component={
                  <TextInput
                    onChangeText={(value) => {
                      this.setState({ labs_results: value });
                    }}
                    multiline={true}
                    numberOfLines={4}
                    value={this.state.labs_results}
                    placeholder={"Опис авто"}
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
                  "minStringLength:10",
                  "maxStringLength:100",
                ]}
                errorMessages={[
                  "*Заповнити обов'язково ",
                  "Мінімальна довжина 10 символів",
                  "Максимальна довжина 100 символів",
                ]}
              ></ValidationComponent>
              <ValidationComponent
                style={styles.input}
                component={
                  <TextInput
                    onChangeText={(value) => {
                      this.setState({ description: value });
                    }}
                    multiline={true}
                    numberOfLines={5}
                    value={this.state.description}
                    placeholder={"Умови використання"}
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
                  "minStringLength:3",
                  "maxStringLength:100",
                ]}
                errorMessages={[
                  "*Заповнити обов'язково  ",
                  "мінімальна довжина 3 символів",
                  "максимальна довжина 100 символів",
                ]}
              ></ValidationComponent>

              <ValidationComponent
                style={styles.input}
                component={
                  <TextInput
                    onChangeText={(value) => {
                      this.setState({ water_speed: value });
                    }}
                    multiline={true}
                    numberOfLines={1}
                    value={this.state.water_speed}
                    placeholder={"Контактний номер телефону"}
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
                validators={["required", "minStringLength:13", "maxStringLength:13"]}
                errorMessages={[
                  "*Заповнити обов'язково  ",
                  "Мінімальна довжина 13",
                  "Максимальна довжина 13",
                ]}
              ></ValidationComponent>
              {/* <ValidationComponent
                style={{ bottom: 10 }}
                component={

                  <TextInput
                    onChangeText={(value) => {
                      this.setState({ if_queue: value });
                    }}
                    multiline={true}
                    numberOfLines={3}
                    value={this.state.if_queue}
                    placeholder={"Наявність черги до джерела"}
                    textAlignVertical={"top"}
                    style={{ padding: 10, paddingBottom: 5 }}
                    onFocus={() => {
                      this.setState({ activeDesc: true });
                    }}
                    onBlur={() => {
                      this.setState({ activeDesc: false });
                    }}
                  /> */}
              <View style={{ bottom: 15 }}>
                <Text
                  style={{
                    padding: 10,
                    backgroundColor: "#465880",
                    width: "100%",
                    borderRadius: 5,
                    color: "white",
                    top: 10,
                  }}
                >
                  Згода з умовами використання
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    top: 10,
                  }}
                >
                  <Text>Так</Text>
                  <RadioButton
                    value="Так"
                    status={
                      this.state.checked === "Так" ? "checked" : "unchecked"
                    }
                    onPress={() => {
                      this.setState({ checked: "Так" });
                    }}
                  />
                  <Text>Ні</Text>
                  <RadioButton
                    value="Ні"
                    status={
                      this.state.checked === "Ні" ? "checked" : "unchecked"
                    }
                    onPress={() => {
                      this.setState({ checked: "Ні" });
                    }}
                  />
                </View>
              </View>
              {/* }
                errorMessageStyle={{
                  color: "red",
                  position: "absolute",
                }}
                validators={["required", "minNumber:5", "maxNumber:120"]}
                errorMessages={[
                  "*Заповнити обов'язково",
                  "Мінімальний час черги 5хв",
                  "Максимальнтй час черги 120хв",
                ]}
              ></ValidationComponent> */}
              {/* <ValidationComponent */}
              {/* component={ */}
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: "90%",
                    height: 200,
                    marginBottom: 30,
                    marginTop: 10,
                  }}
                />
              )}
              <View style={{ bottom: 0, width: "90%" }}>
                <Button
                  title="Фото авто"
                  onPress={this._pickImage}
                  buttonStyle={{
                    borderRadius: 30,
                    backgroundColor: "#465880",
                    borderColor: "#ced4da",
                    borderWidth: 2,
                    left: 0,
                  }}
                />
              </View>
              {/* } */}
              {/* ></ValidationComponent> */}

              {/* <ValidationComponent
                component={ */}
              <View style={{ width: "90%", marginTop: 20, marginBottom: 10 }}>
                <Button
                  title={"Створити"}
                  onPress={() => {
                    this.form.validate();
                  }}
                />
                <Button
                  title={"Назад"}
                  containerStyle={{ marginTop: 10 }}
                  buttonStyle={{ backgroundColor: "black" }}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                />
              </View>

              {/* }
              ></ValidationComponent> */}
            </View>
          </ScrollView>
        </ValidationForm>
      </View>
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
  const { auth, home, location_create } = state;
  return { auth, home, location_create };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changeProps,
      setLastWritings,
      setFetchedUsers,
    },
    dispatch
  );

export default withNavigation(connect(mapStateToProps)(LocationCreate));
