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
// import MiniMap from "./components/mini_map";
import * as firebase from "firebase";
import uuid from "uuid-random";
const { height, width } = Dimensions.get("window");
class LocationEdit extends React.Component {
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

  render() {
    let { image } = this.state;
    let { location_title } = this.props.navigation.state.params;
    return (
      //   <View style={{height:height,width:width}}>
      <ValidationForm
        ref={(ref) => {
          this.form = ref;
        }}
        form={{}}
        style={{ flex:1,backgroundColor:'grey' }}
        onSubmit={() => {
          this.props.navigation.push("Map");
          Alert.alert(
            "Успішно",
            "Ви відредагували своє авто",
            [
              {
                text: "OK",
                onPress: () => {
                  firebase
                    .database()
                    .ref(`/locations/${location_title}`)
                    .update({
                      labs_results: this.state.labs_results,
                      water_speed: this.state.water_speed,
                      if_queue: this.state.checked,
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
        {/* <ScrollView> */}
        {/* <MiniMap /> */}
        <View
          style={{
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "grey",
            alignItems: "center",
            // borderColor: "red",
            // borderWidth: 2,
            // flex: 1,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, bottom: 0 }}>
            Редагування авто
          </Text>
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
              "Мінімальна довжина 30 символів",
              "Максимальна довжина 100 символів",
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
              "Мінімальна довжина номеру 13",
              "Максимальна довжина номеру 13",
            ]}
          ></ValidationComponent>
          {/* <ValidationComponent
                // style={styles.input}
                component={
                 <View style={{height:'100%'}}></View>
                }

              ></ValidationComponent> */}
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
                status={this.state.checked === "Так" ? "checked" : "unchecked"}
                onPress={() => {
                  this.setState({ checked: "Так" });
                }}
              />
              <Text>Ні</Text>
              <RadioButton
                value="Ні"
                status={this.state.checked === "Ні" ? "checked" : "unchecked"}
                onPress={() => {
                  this.setState({ checked: "Ні" });
                }}
              />
            </View>
          </View>
          {/* ></ValidationComponent> */}

          {/* <ValidationComponent
                component={ */}
          <View style={{ width: "90%", marginTop: 20, marginBottom: 10 }}>
            <Button
              title={"Редагувати"}
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
        {/* </ScrollView> */}
      </ValidationForm>
      //   </View>
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

export default withNavigation(connect(mapStateToProps)(LocationEdit));
