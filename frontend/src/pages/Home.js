import { View, Text } from "react-native";
import React from "react";

import Header from "../components/Header";

import { TouchableOpacity } from "react-native";

//icons
import { Ionicons } from "@expo/vector-icons";

export default function Home({ navigation }) {
	// const navigation = useNavigation();
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
