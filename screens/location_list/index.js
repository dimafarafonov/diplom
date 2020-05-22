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
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withNavigation } from "@react-navigation/compat";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import { _getLocations } from "../../reducers/actions";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";

const color = "#2089DC";

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
    const { locations } = this.state;
    return (
      <View style={styles.container}>
        <Text
          style={{
            backgroundColor: "white",
            fontSize: 20,
            paddingVertical: 10,
            textAlign: "center",
          }}
        >
          Мої джерела води
        </Text>
        <ScrollView style={styles.list}>
          {locations.map(
            (marker, index) =>
              marker[1].user_id == this.state.user_id && (
                <TouchableOpacity
                  key={index}
                  style={styles.item}
                  onPress={() =>
                    this.props.navigation.navigate("LocationProfile", {
                      location_id: marker[1].location_id,
                    })
                  }
                >
                  <Image
                    source={{
                      uri:
                        marker[1].image ||
                        "https://lh3.googleusercontent.com/proxy/VEKfTKETyJ6KVe8-A34Li7Bu70PBh9hL67o2zTdVscrQYBsN4TYybTnaTg7WwrjUhqhRLOFKxTJC826-abEAq-ka9BgP9GXb82Cfj-whjjFQ0w",
                    }}
                    style={{ width: 100, height: 100, marginRight: 10 }}
                  />
                  <View>
                    <Text style={{ color, fontSize: 18 }}>
                      {" "}
                      {marker[1].title}{" "}
                    </Text>
                    <Text>{marker[1].description}</Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      right: 10,
                      bottom: 5,
                      zIndex: 9999,
                    }}
                    onPress={async () => {
                      let location = await firebase
                        .database()
                        .ref(`/locations/${marker[1].title}`);
                      await location.remove();
                      await firebase
                        .database()
                        .ref("locations")
                        .on("value", (snapshot) => {
                          let locations = snapshot.val();
                          this.setState({
                            locations: Object.entries(locations),
                          });
                          // this.props._getLocations(locations);
                        });
                    }}
                  >
                    <FontAwesome name="trash" size={32} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      right: 5,
                      bottom: 40,
                      zIndex: 9999,
                    }}
                    onPress={() =>
                      this.props.navigation.navigate("LocationEdit", {
                        location_id: marker[1].location_id,
                        location_title: marker[1].title,
                      })
                    }
                  >
                    <FontAwesome name="edit" size={32} color="black" />
                  </TouchableOpacity>
                </TouchableOpacity>
              )
          )}
        </ScrollView>
        <Button
          icon={<Icon name="plus" size={15} color="white" />}
          containerStyle={{ marginHorizontal: 20, marginBottom: 10 }}
          title=" Створити нове джерело"
          onPress={() => {
            // this.props.changeProps("from Map"),
            this.props.navigation.navigate("LocationCreate");
          }}
        />
        <Button
          containerStyle={{ marginHorizontal: 20, marginBottom: 20 }}
          title="Назад"
          buttonStyle={{ backgroundColor: "black" }}
          onPress={() => {
            // this.props.changeProps("from Map"),
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  list: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  item: {
    backgroundColor: "white",
    marginBottom: 20,
    padding: 5,
    display: "flex",
    flexDirection: "row",
  },
});
const mapStateToProps = (state) => {
  const { auth, home, location_create } = state;
  return { auth, home, location_create };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      _getLocations,
    },
    dispatch
  );
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(LocationList)
);
