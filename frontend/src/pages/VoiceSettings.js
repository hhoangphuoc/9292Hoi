import React from 'react';
import { ScrollView, SafeAreaView} from 'react-native';

//constants
import { voiceAssitantList, voiceSettingsList, gamificationList } from '../constant';

//components
import ListFeatures from '../components/ListFeatures';

//navigation
// import { useNavigation } from '@react-navigation/native';


export default function VoiceSettings() {
    // const navigation = useNavigation();
    //create list of multiple accordion
    return (
        <SafeAreaView className="flex-1 mt-4 items-center bg-neutral-900">
            <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
                <ListFeatures list={voiceAssitantList} />
                <ListFeatures list={voiceSettingsList}/>
                <ListFeatures list={gamificationList}/>
            </ScrollView>
        </SafeAreaView>
    );
};
 