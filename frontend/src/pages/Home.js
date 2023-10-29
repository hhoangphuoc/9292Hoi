import { View, Text } from 'react-native'
import React from 'react'

import Header from '../components/Header'

import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//icons
import { Ionicons } from '@expo/vector-icons';
//navigation
// import { useNavigation } from '@react-navigation/native';

export default function Home() {
    // const navigation = useNavigation();
    return (
        <View className="flex-1 flex-col items-center justify-center">
            <Text>Home</Text>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                {/* App Touchable icon which navigate to the chat screen */}
                {/* <Ionicons name="chatbubbles" style={{
                    alignSelf: 'center',
                    // marginTop: 100
                }} size={100} color="black" /> */}
            {/* </TouchableOpacity> 
            */}
        </View>
    )
}