import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({
	// fromAddress,
	// setFromAddress,
	// toAddress,
	// setToAddress,
	// selectedFromLocation,
	// selectedToLocation,
	addressType,
	address,
	setAddress,
	selectedLocation,
	placeholder,
}) {
	// console.log("Search bar rendered with address type: ", addressType);
	return (
		<View className="flex flex-row justify-start items-center ml-3">
			<TextInput
				className="bg-transparent w-full rounded-sm px-2 mt-2"
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
