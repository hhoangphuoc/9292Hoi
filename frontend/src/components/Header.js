import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header({ navigation, screen }) {
	//  const navigation = useNavigation();
	return (
		<View className="h-20 flex-row w-full absolute py-5 pb-2 left-0 right-0 bg-black z-10 px-3 justify-between items-center">
			<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
				<Ionicons name="menu" size={30} color="#f5f5f5" />
			</TouchableOpacity>
			<View>
				<Text className="text-neutral-100 text-xl font-medium">{screen}</Text>
			</View>
			<TouchableOpacity>
				<Ionicons name="notifications" size={24} color="#f5f5f5" />
			</TouchableOpacity>
		</View>
	);
}
