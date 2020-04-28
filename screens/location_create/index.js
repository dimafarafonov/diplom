import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput,Alert } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "@react-navigation/compat";
import { ValidationForm, ValidationComponent } from "react-native-validation";
import { Button } from "react-native-elements";
import MiniMap from "./components/mini_map";
import * as firebase from "firebase";
class LocationCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      description:''
    };
  }

  render() {
    return (
      <ValidationForm
        ref={(ref) => {
          this.form = ref;
        }}
        style={{ flex: 1 }}
        onSubmit={() => {
          Alert.alert(
            "Успішно",
            "Ви записали нового користувача в базу даних",
            [
              {
                text: "OK",
                onPress: () => {
                  console.log('succes added fields in database')
                  firebase.database().ref(`/locations/${this.state.title}`).set({
                    coords: this.props.location_create.coords,
                    title:this.state.title,
                    description:this.state.description
                  });
                },
              },
            ],
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
            backgroundColor: "grey",
            alignItems: "center",
            // borderColor: "red",
            // borderWidth: 2,
            flex: 1,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, bottom: 50 }}>
            Створення локації
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
                  placeholder={"Введіть назву локації"}
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
                "maxStringLength:30",
              ]}
              errorMessages={[
                "*Заповнити обов'язково title",
                "мінамільна довжина назви 5 символів",
                "максимальна довжина назви 30 символів",
              ]}
            ></ValidationComponent>
          </View>
          {!this.state.is_valid ? null : (
            <Text style={{ color: "red", position: "absolute" }}>
              Ваш логін не унікальний
            </Text>
          )}
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
                placeholder={"Опишіть локацію, для чого вона?"}
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
              "*Заповнити обов'язково descrip",
              "мінімальна довжина 30 символів",
              "максимальна довжина 100 символів",
            ]}
          ></ValidationComponent>
          <View>
            <Button
              title={"Створити"}
              buttonStyle={{
                top: 25,
                borderRadius: 30,
                backgroundColor: "#465880",
                borderColor: "#ced4da",
                borderWidth: 2,
              }}
              onPress={() => {
                this.form.validate();
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
        ></View>
        <MiniMap />
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
