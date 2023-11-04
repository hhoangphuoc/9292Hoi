// import { View, Text } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { 
    VoiceSettings,
    CustomVoiceSettings,
    Shop
} from '../pages';

const VoiceStack = createStackNavigator();

export default function VoiceSettingsLayout() {
  return (
    <VoiceStack.Navigator>
        <VoiceStack.Screen name="AllVoiceSettings" component={VoiceSettings} />
        <VoiceStack.Screen name="CustomVoiceSettings" component={CustomVoiceSettings} />
        <VoiceStack.Screen name="Shop" component={Shop} />
    </VoiceStack.Navigator>
  )
}