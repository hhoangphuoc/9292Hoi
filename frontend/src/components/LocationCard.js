import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function LocationCard({
	location,
	setSelectedLocation,
	setLocationList,
	// setAddress,
	// addressType,
}) {
	let icon = "";
	switch (location?.type) {
		case "Station":
			icon = "train-outline";
			break;
		case "Stop":
			icon = "bus-outline";
			break;
		case "Address":
			icon = "location-outline";
			break;
		case "Poi":
			icon = "pin-outline";
			break;
		default:
			icon = "location-outline";
	}

	// const handleLocationSelect = (location) => {
	// 	if (addressType === "From") {
	// 		setAddress(location?.displayName);
	// 		setSelectedLocation(location);
	// 		setLocationList([]);
	// 	} else if (addressType === "To") {
	// 		setAddress(location?.displayName);
	// 		setSelectedLocation(location);
	// 		setLocationList([]);
	// 	}
	// };

	// 	if (fromAddress) {
	// 		setFromAddress(location?.displayName);
	// 		setSelectedFromLocation(location);

	// 		setLocationList([]);
	// 		console.log("Location List after select: ", locationList);
	// 	} else if (toAddress) {
	// 		setToAddress(location?.displayName);
	// 		setSelectedToLocation(location);

	// 		setLocationList([]);
	// 	}
	// };

	return (
		<TouchableOpacity
			className="items-start flex-row p-2 w-11/12 mx-2"
			onPress={() => {
				// handleLocationSelect(location);
				console.log("Location Selected: ", location);
				setSelectedLocation(location);
				setLocationList([]);
			}}
		>
			<View className="flex-row items-center justify-between mr-4 bg-neutral-800 rounded-sm">
				{/* <View> */}
				{/* Location information and Icons */}
				<View className="flex-row items-start justify-center p-2">
					{/* Type Icon */}
					<View className="items-center justify-center px-2 py-4">
						<Ionicons name={icon} size={24} color="white" />
					</View>
					{/* Location information */}
					<View className="flex-1 flex-col items-start justify-center p-2">
						<Text className="text-neutral-100 font-bold text-lg">
							{location?.displayName}
						</Text>
						<View className="flex-row items-center justify-start">
							<Text className=" text-neutral-400 text-sm">
								{location?.type}
							</Text>
							<Text className=" text-neutral-300 text-sm mx-2">-</Text>
							<Text className=" text-neutral-300 text-sm">
								{location?.placeName}
							</Text>
						</View>
					</View>
				</View>

				{/* Add Icon */}
				<View className="right-8">
					<Ionicons name="add-outline" size={24} color="white" />
				</View>

				{/* </View> */}
				{/* <View className="w-full h-[1px] bottom-4 bg-neutral-400"></View> */}
			</View>
		</TouchableOpacity>
	);
}
