import { View, Text } from "react-native";
import React from "react";

export default function CustomVoiceSettings({ navigation }) {
	return (
		<View className=" flex-1 items-center justify-center bg-neutral-900">
			<Text
				className="text-neutral-100 font-bold text-lg text-center mt-3"
				// numberOfLines={2}
				// ellipsizeMode="tail"
			>
				Custom Voice Settings
			</Text>
		</View>
	);
}
