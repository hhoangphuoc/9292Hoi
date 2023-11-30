import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({
	addressType,
	address,
	setAddress,
	selectedLocation,
	placeholder,
}) {
	return (
		<View className="flex flex-row justify-start items-center ml-3">
			<TextInput
				className="bg-transparent w-full rounded-sm px-2 mt-2 text-neutral-100"
				placeholderTextColor={"#f5f5f5"}
				cursorColor={"#99f6e4"}
				placeholder={placeholder}
				value={
					selectedLocation === null
						? address
						: selectedLocation?.displayName.toString()
				}
				onChangeText={(text) => setAddress(text)}
			/>
		</View>
	);
}
