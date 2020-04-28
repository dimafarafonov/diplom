import { AsyncStorage } from "react-native";

export function _removeData() {
  try {
    AsyncStorage.removeItem("UNIQUE");
  } catch (error) {
    // Error saving data
  }
}

export function _storeData() {
  try {
    AsyncStorage.setItem("UNIQUE", "dev_gerelo");
  } catch (error) {
    // Error saving data
  }
}
export const _retrieveData = (value) => ({
  type: "RETRIEVE_DATA",
  payload: value,
});


export const _getLocations = (value) => ({
  type: "GET_LOCATIONS",
  locations: value,
});
