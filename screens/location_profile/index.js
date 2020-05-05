import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "@react-navigation/compat";
class LocationProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: Object.entries(this.props.auth.locations),
      location_id: this.props.navigation.state.params.id,
    };
  }
  componentDidMount() {}
  render() {
    const { locations } = this.state;
    let title = "";
    let description = "";
    locations.map((marker, index) => {
      marker[1].location_id == this.state.location_id
        ? ((title = marker[1].title), (description = marker[1].description))
        : null;
    });
    console.log("title", title);
    console.log("description", description);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          marginTop: 25,
          fontSize: 40,
        }}
      >
        <Text> Назва - {title}</Text>
        <Text> Опис - {description}</Text>
        <Text> Фотка - </Text>
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
