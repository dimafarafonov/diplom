import { AsyncStorage } from "react-native";

export function _removeData() {
  try {
    AsyncStorage.removeItem("UNIQUE");
  } catch (error) {
    // Error saving data
  }
}

// export   function _storeData (token) {
//   try {
//     AsyncStorage.setItem("UNIQUE", token);
//   } catch (error) {
//     // Error saving data
//   }
// }
export const _retrieveData = (value) => ({
  type: "RETRIEVE_DATA",
  payload: value,
});

export const _getCurrentPosition = (position) => ({
  type: "CURRENT_POS",
  position: position,
});
export const _getLocations = (value) => ({
  type: "GET_LOCATIONS",
  locations: value,
});
export const _getComments = (comments) => ({
  type: "GET_COMMENTS",
  comments: comments,
});
