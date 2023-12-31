import React from "react";
import { ScrollView, SafeAreaView } from "react-native";

//constants
import {
	voiceAssitantList,
	voiceSettingsList,
	gamificationList,
} from "../constant";

//components
import ListFeatures from "../components/ListFeatures";

//navigation
// import { useNavigation } from '@react-navigation/native';

export default function VoiceSettings({ navigation }) {
	return (
		<SafeAreaView className="flex-1 pt-20 items-center bg-neutral-900">
			<ScrollView className="w-full" showsVerticalScrollIndicator={false}>
				<ListFeatures list={voiceAssitantList} navigation={navigation} />
				<ListFeatures list={voiceSettingsList} navigation={navigation} />
				<ListFeatures list={gamificationList} navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	);
}
