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
import { AntDesign } from '@expo/vector-icons';
const color = '#2089DC';


class LocationProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: Object.entries(this.props.auth.locations),
      location_id: this.props.navigation.state.params.location_id,
    };
  }
  

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


    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => {this.props.navigation.goBack()}} style={{alignItems: 'center', justifyContent: 'center', backgroundColor: color, width: 50, height: 50, borderRadius: 25, top: 10, left: 10, position: 'absolute', zIndex: 2}}>
              <AntDesign name="arrowleft" size={28} color="white" />
            </TouchableOpacity>
            <Image
              source={{ uri: img }}
              style={{ width: '100%', height: 200}}
            />
            <View style={styles.content}>
              <Text style={styles.title}>{title}</Text>
              <Text>Швидкість води: {water_speed}л/с</Text>
              <Text>Якість води - {water_rate}</Text>
              <Text style={{paddingBottom: 10,}}>Черга до джерела - {if_queue}</Text>
              <View style={{backgroundColor: '#F6F8FA', padding: 10, marginBottom: 10,}}>
                <Text style={{paddingBottom: 10,}}>Можливість під'їзду до джерела:</Text>
                <Text>{togoal_distance}</Text>
              </View>
              <View style={{backgroundColor: '#F6F8FA', padding: 10, marginBottom: 10,}}>
                <Text style={{paddingBottom: 10,}}>Результати лабораторних досліджень:</Text>
                <Text>{labs_results}</Text>
              </View>
              <View style={{backgroundColor: '#F6F8FA', padding: 10, marginBottom: 10,}}>
                <Text style={{paddingBottom: 10,}}>Опис місця:</Text>
                <Text>{description}</Text>
              </View>
            </View>
            <Comments location_id={this.state.location_id} />
        </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
  },
  title: {
    color, 
    fontSize: 22,
    borderBottomColor: color,
    borderBottomWidth: 1,
    marginBottom: 10,
  }
});
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
