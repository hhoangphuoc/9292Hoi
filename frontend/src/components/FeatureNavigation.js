import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

//icons
import { Ionicons } from "@expo/vector-icons";

//navigation
import { useNavigation } from "@react-navigation/native";

//Function to render the feature which has the Navigation icon, redirecting to other page

export default function FeatureNavigation({ item, navigation }) {
	// const navigation = useNavigation();
	return (
		<TouchableOpacity
			collapsable={false}
			className="flex-row items-center h-14 w-full bg-black justify-between mb-2"
			onPress={() => {
				navigation.navigate(item.featureName);
			}}
		>
			<View className="flex-col">
				<Text className="flex-1 text-sm text-white ml-8">
					{item.featureName}
				</Text>
				<Text
					className="flex-1 text-xs italic text-white ml-8"
					numberOfLines={2}
					ellipsizeMode="tail"
				>
					{item.featureDescription}
				</Text>
			</View>
			<Ionicons name="chevron-forward-outline" size={24} color="white" />
		</TouchableOpacity>
	);
}
