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
import Comments from "./components/comments";
import { connect } from "react-redux";
import MyText from "./components/custom_text";
import { withNavigation } from "@react-navigation/compat";
import { ScrollView } from "react-native-gesture-handler";
class LocationProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: Object.entries(this.props.auth.locations),
      location_id: this.props.navigation.state.params.location_id,
    };
  }
  componentDidMount() {}
  render() {
    const { locations } = this.state;
    let title = "";
    let description = "";
    let img = "";
    let water_rate = "";
    let labs_results = "";
    let togoal_distance = "";
    let if_queue = "";
    let water_speed = "";
    locations.map((marker, index) => {
      marker[1].location_id == this.state.location_id
        ? ((title = marker[1].title),
          (description = marker[1].description),
          (img = marker[1].image),
          (water_rate = marker[1].water_rate),
          (labs_results = marker[1].labs_results),
          (togoal_distance = marker[1].togoal_distance),
          (if_queue = marker[1].if_queue),
          (water_speed = marker[1].water_speed))
        : null;
    });
    console.log("this.state.id", this.state.location_id);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          fontSize: 40,
        }}
      >
        <ScrollView>
          <View>
            <MyText>
              <Text>
                {" "}
                Назва - {title} {"\n"}
              </Text>
              <Text>
                {" "}
                Швидкість води - {water_speed} л/с {"\n"}
              </Text>
              <Text>
                {" "}
                Якість води - {water_rate} {"\n"}
              </Text>
              <Text>
                {" "}
                Результати лабораторних досліджень - {labs_results} {"\n"}
              </Text>
              <Text>
                {" "}
                Можливість під'їзду до джерела - {togoal_distance} {"\n"}
              </Text>
              <Text>
                {" "}
                Черга до джерела - {if_queue} хв {"\n"}
              </Text>
              <Text>
                {" "}
                Опис - {description} {"\n"}
              </Text>
            </MyText>
            {/* <Text> Опис - {description}</Text> */}
            <Image
              source={{ uri: img }}
              style={{ width: 200, height: 200, left: 10 }}
            />
          </View>
          <Comments location_id={this.state.location_id} />
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

export default withNavigation(connect(mapStateToProps)(LocationProfile));
