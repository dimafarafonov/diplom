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
import * as firebase from "firebase";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { withNavigation } from "@react-navigation/compat";
import uuid from "uuid-random";
class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      token: this.props.auth.have_token,
      user_id: this.props.home.username,
      location_id: this.props.location_id,
      users: this.props.home.users,
      comments: this.props.auth.comments,
    };
  }
  async componentDidMount() {
    const { users, user_id } = this.state;

    // console.log('this.props.have_token',this.props.auth.have_token)
    if (users != null) {
      Object.entries(users).filter((key, index) => {
        if (key[1].token == this.state.token) console.log("this. have workerd");
        this.setState({ user_id: key[1].id });
      });
    }
    // const { users, user_id } = this.state;
    let value = "";
    Object.getOwnPropertyNames(users).forEach(function (val, idx, array) {
      // console.log('users on location',users[val].id)
      // console.log('users on location1',user_id)
      // console.log('users on location2',val)
      if (users[val].id == user_id) {
        value = val;
      }
      console.log("value", value);
    });
    this.setState({ username: value });
  }
  createComment = () => {
    if (!this.state.text) return;
    console.log("succes added fields in database");
    firebase.database().ref(`/comments/${uuid()}`).set({
      message: this.state.text,
      user_id: this.state.user_id,
      location_id: this.state.location_id,
      username: this.state.username,
    });
    Alert.alert(
      "Успішно",
      "Ви створили новий коментар",
      [{ text: "OK", onPress: () => console.log("OK") }],
      { cancelable: false }
    );
  };

  //   getComments = () => {
  //     firebase
  //       .database()
  //       .ref("comments")
  //       .on("value", (snapshot) => {
  //         const comments = snapshot.val();
  //         this.setState({ comments: comments });
  //       });
  //   };

  render() {
    const { comments } = this.state;
    return (
      <View>
        <View style={{ marginTop: "50%" }}>
          <TextInput
            style={{ height:40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={(text) => {
              this.setState({ text: text });
            }}

            value={this.state.text}
            placeholder={"Тут можна написати відгук"}
            multiline={true}
          />
          <View style={{ position: "absolute", right: 0,bottom: -7 }}>
            <Icon
              name="chevron-right"
              type="evilicon"
              color="#517fa4"
              size={70}
              underlayColor="transparent"
              onPress={() => {
                this.createComment();
              }}
            />
          </View>
        </View>
        <Text>Відгуки:</Text>

        {comments
          ? Object.entries(comments).map((key, index) => {
              if (key[1].location_id == this.state.location_id) {
                return (
                  <View key={index} style={{ marginTop: 15 }}>
                    <Text style={{ color: "red" }}>
                      {key[1].username}:{" "}
                      <Text style={{ color: "black" }}>{key[1].message}</Text>
                    </Text>
                  </View>
                );
              }
            })
          : null}
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

export default withNavigation(connect(mapStateToProps)(Comments));
