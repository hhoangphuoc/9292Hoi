import React, {useState} from 'react';
import { View, Text} from 'react-native';
import Slider from '@react-native-community/slider';


//Function to render the feature which has the Slider elements

export default function FeatureSlider({ item}) {
    return (
        <View
            collapsable={false}
            className="flex-col h-14 w-full mb-2"
        > 
            {/* <View className="flex-col"> */}
            <Text className="flex-1 text-sm text-white ml-8">{item.featureName}</Text>
            <Text 
            
                className="flex-1 text-xs italic text-white ml-8"
                //max 2 lines
                numberOfLines={2}
            >{item.featureDescription}</Text>
            <View className="flex-1 px-4">
                <Slider
                    className="w-48 h-10"
                    // style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#7cc"
                    maximumTrackTintColor="#7cc"
                />
            </View>

            {/* </View> */}


            {/* <Switch
                trackColor={{ false: "#767577", true: "#7cc" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                // ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={enabled}
            /> */}
        </View>
    );
};
