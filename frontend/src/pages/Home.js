import { View, Text } from "react-native";
import React from "react";

import Header from "../components/Header";

import { TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";

//icons
import { Ionicons } from "@expo/vector-icons";

export default function Home({ navigation }) {
	// const navigation = useNavigation();
	return (
		<View className="flex-1 flex-col items-center justify-center bg-neutral-900">
			<TouchableOpacity onPress={() => navigation.navigate("LocationScreen")}>
				{/* App Touchable icon which navigate to the chat screen */}
				<Ionicons
					name="chatbubbles"
					style={{
						alignSelf: "center",
						// marginTop: 100
					}}
					size={180}
					color="#7cc"
				/>
			</TouchableOpacity>
			<Text className="text-neutral-100 font-bold text-lg text-center mt-3">
				Hoi! Let's go Travelling..
			</Text>
		</View>
	);
}
