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
  render() {
    // console.log("this.satte.username", this.state.username);
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
        <ScrollView>
          {locations.map((marker, index) =>
            marker[1].user_id == this.state.user_id ? (
              <TouchableOpacity
                key={index}
                style={{
                  height: 300,
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
                Результати лабораторних досліджень: {marker[1].labs_results} {"\n"}
              </Text>
              <Text>
                {" "}
                Можливість під'їзду до джерела: {marker[1].togoal_distance} {"\n"}
              </Text>
              <Text>
                {" "}
                Черга до джерела: {marker[1].if_queue} хв {"\n"}
              </Text>
              <Text>
                {" "}
                Опис: {marker[1].description} {"\n"}
              </Text>
              <Text>
                {" "}
               Фото: {"\n"}
              </Text>
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
