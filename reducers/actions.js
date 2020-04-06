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

// retrieveData = () => {
//   try {
//     const value = AsyncStorage.getItem("UNIQUE");
//     if (value !== null) {
//       console.log("We have data", value);
//       return value;
//     } else {
//       return false;
//     }
//   } catch (error) {}
// };

export const _retrieveData = (value) => ({
  type: "RETRIEVE_DATA",
  payload: value,
});
