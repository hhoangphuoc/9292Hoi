import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import SideMenu from './src/navigation/SideMenu';
export default function App() {
  return (
    <NavigationContainer>
      {/* <StatusBar style="auto" /> */}
      <SideMenu/>
      {/* <View>
        <Text>Open up App.js to start working on your app!</Text>
      </View> */}
    </NavigationContainer>
  );
}