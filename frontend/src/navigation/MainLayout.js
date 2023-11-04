import { View, Text } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { ChatScreen, Home, MapNavigations, TravelDetails } from '../pages';
import SideMenu from './SideMenu';

const MainStack = createStackNavigator();

export default function MainLayout() {
  return (
    <MainStack.Navigator
      // headerMode="none"
      //hide the header from the main screen
      screenOptions={{
        headerShown: false
      }}
      >
        <MainStack.Screen 
          name="Menu" 
          component={SideMenu} />
        <MainStack.Screen name="Chat Screen" component={ChatScreen} />
        <MainStack.Screen name="Map Navigation" component={MapNavigations} />
        <MainStack.Screen name="Travel Details" component={TravelDetails} />
    </MainStack.Navigator>
  )
}