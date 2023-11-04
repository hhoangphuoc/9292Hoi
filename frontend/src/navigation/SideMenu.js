import React from 'react'
import { Text} from 'react-native'

import {
    createDrawerNavigator, 
} from '@react-navigation/drawer'
// import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { Home, Profile } from '../pages';
import VoiceSettingsLayout from './VoiceSettingsLayout';
//icons 
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();
const DrawerItems = [
  {
    name: "Home",
    iconName: "home-outline"
  },
  {
    name: "Profile",
    iconName: "person-circle-outline"
  },
  {
      name:"Departure",
      iconName:"time-outline"
  },
  {
      name:"My Travel Advice",
      iconName:"calendar-outline"
  },
  {
      name: "Voice Settings",
      iconName: "settings-outline"
  },

]

export default function SideMenu(){
    return (
        <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerType: "slide",
          overlayColor:"transparent",
          drawerStyle:{
              flex:1,
              width:'85%',
              paddingRight:20,
              backgroundColor:"#222222",
          },
          sceneContainerStyle:{
              backgroundColor:"#ffffff",
          }
      }}
        >
          {
            DrawerItems.map((sideMenuItem, index) => {
              return (
                <Drawer.Screen
                  key={index}
                  name={sideMenuItem.name}
                  component={
                    sideMenuItem.name === 'Home' ? Home :
                    sideMenuItem.name === 'Voice Settings' ? VoiceSettingsLayout :
                    sideMenuItem.name === 'Profile' ? Profile : Home
                  }
                  options={{
                    drawerIcon: ({ focused}) => (
                      <Ionicons
                        name={sideMenuItem.iconName}
                        size={24}
                        color={focused ? '#7cc' : '#ccc'}
                      />
                    ),
                    drawerLabel: ({ focused }) => (
                      <Text
                        style={{
                          color: focused ? '#7cc' : '#ccc',
                          fontSize: 15,
                          fontWeight: focused ? 'bold' : 'normal'
                        }}
                      >
                        {sideMenuItem.name}
                      </Text>
                    ),
                    headerShown: true,
                    header: ({ navigation }) => (
                      <Header
                        screen={sideMenuItem.name}
                      />
                    )
                  }
                }
                />
              );
            })
          }
        </Drawer.Navigator>
    )
}