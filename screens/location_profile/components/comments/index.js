import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import { Icon, Input } from "react-native-elements";
import { connect } from "react-redux";
import { withNavigation } from "@react-navigation/compat";
import uuid from "uuid-random";


const color = '#2089DC';

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

    if (users != null) {
      Object.entries(users).filter((key, index) => {
        if (key[1].token == this.state.token)
          this.setState({ user_id: key[1].id, username: key[1].pib });
      });
    }
    // let value = "";
    // Object.getOwnPropertyNames(users).forEach(function (val, idx, array) {
    //   if (users[val].id == user_id) {
    //     value = val;
    //   }
    // });
    // this.setState({ username: value });
  }
  createComment = async () => {
    if (!this.state.text) return;
    await firebase.database().ref(`/comments/${uuid()}`).set({
      message: this.state.text,
      user_id: this.state.user_id,
      location_id: this.state.location_id,
      username: this.state.username,
    });
    await this.getComments();
    Alert.alert(
      "Успішно",
      "Ви створили новий коментар",
      { cancelable: false }
    );
  };

  getComments = () => {
    firebase
      .database()
      .ref("comments")
      .on("value", (snapshot) => {
        const comments = snapshot.val();
        this.setState({ comments: comments });
      });
  };

  render() {
    const { comments } = this.state;
    return (
      <View>
        <View style={{ marginTop: "2%" }}>
          <TextInput
            style={{
              height: 40,

              borderWidth: 1,
              borderRadius: 10,
              paddingLeft: 10,
              borderColor: "lightgrey",
              backgroundColor: "white",
              width: "90%",
              left: "5%",
            }}
            onChangeText={(text) => {
              this.setState({ text: text });
            }}
            value={this.state.text}
            placeholder={"Тут можна написати відгук"}
            multiline={true}
          />
          <View style={{ position: "absolute", right: "6%", bottom: 2 }}>
            <Icon
              name="send"
              type="send"
              color="#517fa4"
              size={35}
              underlayColor="transparent"
              onPress={() => {
                this.createComment();
              }}
            />
          </View>
        </View>
        {/* <Text>Відгуки:</Text> */}

        {comments
          ? Object.entries(comments).map((key, index) => {
              if (key[1].location_id == this.state.location_id) {
                return (
                  <View
                    key={index}
                    style={{
                      marginTop: 10,
                      marginBottom:5,
                      backgroundColor: "lightgrey",
                      padding: 15,
                      width: "90%",
                      left: "5%",
                      borderRadius: 30,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("../../../../assets/nobody.jpg")}
                        style={{ width: 50, height: 50, borderRadius: 50 }}
                        resizeMode={"contain"}
                      />
                      <View style={{marginLeft: 10,width:'83%'}}>
                        <Text
                          style={{
                            color,
                            fontWeight: "bold",
                          }}
                        >
                          {key[1].username}:{" "}
                        </Text>
                        <Text style={{ color: "#4c4c4c", fontWeight: "bold"}}>
                          {key[1].message}
                        </Text>
                      </View>
                    </View>
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
