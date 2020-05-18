import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  Image,
} from "react-native";
import MyText from "../location_profile/components/custom_text";
import { connect } from "react-redux";
import { withNavigation } from "@react-navigation/compat";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: Object.entries(this.props.auth.locations || 0) || "",
      users: this.props.home.users,
      user_id: this.props.home.username,
    };
  }
  async componentDidMount() {
    this.setState({ token: await AsyncStorage.getItem("UNIQUE") });
    const { users } = this.state;
    if (users != null) {
      Object.entries(users).filter((key, index) => {
        if (key[1].token == this.state.token)
          this.setState({ user_id: key[1].id });
      });
    }
  }
  isNoUsersLocations = () => {
    let count = 0;
    const { locations } = this.state;
    locations.map((marker, index) =>
      marker[1].user_id == this.state.user_id ? count++ : null
    );
    // console.log("count");
    if (!count) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            top: "50%",
          }}
        >
          <Text style={{ textAlign: "center" }}>
            Ви ще не створили жодної локації, якщо ви хочете створити локацію
            натисніть на кнопку в правому нижньому кутку
          </Text>
        </View>
      );
    }
    // else{

    // }
  };

  render() {
    // console.log("this.satte.username", this.state.username);
    // let count = 0;
    const { locations } = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          marginTop: 25,
          left: 0,
          fontSize: 40,
        }}
      >
        <Button
          title="+"
          buttonStyle={{
            position: "absolute",
            right: 5,
            top: -20  ,
            zIndex:9999,
            borderRadius: 50,
            paddingTop: 5,
            paddingBottom: 10,
            paddingLeft: 15,
            paddingRight: 15,
          }}
          onPress={() => {
            // this.props.changeProps("from Map"),
            this.props.navigation.navigate("LocationCreate");
          }}
          color="orange"
        ></Button>
        {this.isNoUsersLocations()}
        <ScrollView>
          {locations.map((marker, index) =>
            marker[1].user_id == this.state.user_id ? (
              <TouchableOpacity
                key={index}
                style={{
                  height: 330,
                  width: "95%",
                  backgroundColor: "lightgrey",
                  left: 5,
                  marginBottom: 20,
                }}
                onPress={() =>
                  this.props.navigation.navigate("LocationProfile", {
                    location_id: marker[1].location_id,
                  })
                }
              >
                {/* {count++} */}
                <MyText>
                  <Text>
                    {" "}
                    Назва: {marker[1].title} {"\n"}
                  </Text>
                  <Text>
                    {" "}
                    Швидкість води: {marker[1].water_speed} л/с {"\n"}
                  </Text>
                  <Text>
                    {" "}
                    Якість води: {marker[1].water_rate} {"\n"}
                  </Text>
                  <Text>
                    {" "}
                    Результати лабораторних досліджень: {
                      marker[1].labs_results
                    }{" "}
                    {"\n"}
                  </Text>
                  <Text>
                    {" "}
                    Можливість під'їзду до джерела: {
                      marker[1].togoal_distance
                    }{" "}
                    {"\n"}
                  </Text>
                  <Text>
                    {" "}
                    Черга до джерела: {marker[1].if_queue} хв {"\n"}
                  </Text>
                  <Text>
                    {" "}
                    Опис: {marker[1].description} {"\n"}
                  </Text>
                  <Text> Фото: {"\n"}</Text>
                </MyText>
                <Image
                  source={{ uri: marker[1].image }}
                  style={{ width: 100, height: 100, left: 5 }}
                />
              </TouchableOpacity>
            ) : null
          )}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
const mapStateToProps = (state) => {
  const { auth, home, location_create } = state;
  return { auth, home, location_create };
};
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       changeProps,
//       setLastWritings,
//       setFetchedUsers,
//     },
//     dispatch
//   );

export default withNavigation(connect(mapStateToProps)(LocationList));
