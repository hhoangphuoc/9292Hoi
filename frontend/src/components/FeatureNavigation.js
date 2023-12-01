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
			className="flex-row items-center w-full justify-start mx-4 pb-2 my-2"
			onPress={() => {
				navigation.navigate(item.pageNavigationName);
			}}
		>
			<View className="flex-col mr-1 mb-2">
				<Text className="text-sm text-neutral-100">{item.featureName}</Text>
				<Text
					className="text-xs italic opacity-75 text-neutral-100"
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
