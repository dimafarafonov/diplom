import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './screens/map'
export default function App() {

  return (  
      <Map/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
