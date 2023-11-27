import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";

import Header from "../components/Header";

import { TouchableOpacity } from "react-native";

//icons
import { Ionicons } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import { handlePlay, handleStop } from "../constant/helperFunctions";

export default function Home({ navigation }) {
	const welcomeVoice = useSelector((state) => state.selectedVoice.voices[0]); //voices 0 contains the voice of welcome message

	//play the audio when page is loaded
	useEffect(() => {
		const sound = new Audio.Sound();

		const loadAndPlayAudio = async () => {
			try {
				await sound.loadAsync(welcomeVoice.voiceUrl);
				await sound.playAsync();
			} catch (error) {
				console.error("AUDIO PLAY: ", error);
			}
		};

		loadAndPlayAudio();

		return () => {
			sound.unloadAsync(); // Unload the sound when the component unmounts
		};
	}, []);

	return (
		<View className="flex-1 flex-col items-center justify-center bg-neutral-900">
			<TouchableOpacity onPress={() => navigation.navigate("LocationScreen")}>
				{/* App Touchable icon which navigate to the chat screen */}
				<Ionicons
					name="navigate-circle-outline"
					style={{
						alignSelf: "center",
						// marginTop: 100
					}}
					size={180}
					color="#99f6e4"
				/>
			</TouchableOpacity>
			<Text className="text-neutral-100 font-bold text-lg text-center mt-3">
				Hoi! Let's go Travelling..
			</Text>

			<Text className="text-neutral-100 font-bold text-sm text-center mt-3 mb-12">
				Don't know where to go? Ask our companion!
			</Text>
			{/* Create a floating button to navigate to the chat screen */}
			<View className="absolute bottom-6 right-6">
				<TouchableOpacity className="items-center justify-center w-16 h-16 bg-neutral-800 rounded-full">
					<Ionicons name="chatbubbles-outline" size={32} color="#99f6e4" />
				</TouchableOpacity>
			</View>
		</View>
	);
}
