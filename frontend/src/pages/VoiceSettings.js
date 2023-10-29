import React, { useState, useRef } from 'react';
import { View, ScrollView, SafeAreaView} from 'react-native';

//icons
import { Ionicons } from '@expo/vector-icons';

//from src
import ListFeatures from '../components/ListFeatures';


export default function VoiceSettings() {

    //create list of multiple accordion
    const voiceAssitantList = {
        title: 'Voice Assistant',
        data: [
            {
                id: '1',
                type: 'switch',
                featureName: 'Enable Voice Assistant',
                featureDescription: 'Enable voice assistant to help you navigate the app.',
            },
            {
                id:'2',
                type: 'slider',
                featureName: 'Custom Voice speed',
                featureDescription: 'Change the speed of the voice assistant.',
            },
            {
                id: '3',
                type: 'subpage',
                featureName: 'Customise Voice',
                featureDescription: 'Customise your assistant voice, accent, and language.',
            },
        ]
    }

    const voiceSettingsList = {
        title: 'Voice Travelling Features',
        data: [
            {
                id: '1',
                type: 'switch',
                featureName: 'Enable Travelling information',
                featureDescription: 'Include realtime information about the departure, arrival location, scheduling, and navigation.',
            },
            {
                id: '2',
                type: 'switch',
                featureName: 'Enable Voice announcements',
                featureDescription: 'Notifications about destination, next stop, and delays through voice announcements.',
            },
            {
                id: '3',
                type: 'switch',
                featureName: 'Enable Route information',
                featureDescription: 'Notifications about route changes, route recommendations, and other route information.',
            }
        ]
    }
    const gamificationList = {
        title: 'Games Features',
        data: [
            {
                id: '1',
                type: 'switch',
                featureName: 'Coins Rewards',
                featureDescription: 'Earn coins by travelling and use them to redeem rewards.',
            },
            {
                id: '2',
                type: 'subpage',
                featureName: 'History',
                featureDescription: 'View your travel history and coins earned.',
            },
        ]
    }

    return (
        <SafeAreaView className="flex-1 pt-16 items-center bg-neutral-900">
            <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
                <ListFeatures list={voiceAssitantList}/>
                <ListFeatures list={voiceSettingsList}/>
                <ListFeatures list={gamificationList}/>
            </ScrollView>
        </SafeAreaView>
    );
};
