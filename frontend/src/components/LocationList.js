import { Text, FlatList, View } from "react-native";
import React, { useEffect } from "react";

import LocationCard from "./LocationCard";
// import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function LocationList({
	locations,
	setSelectedLocation,
	setLocationList,
	// setAddress,
	// addressType,
}) {
	// console.log("Location List rendered: ", locations?.length);
	// console.log("Address type: ", addressType);

	return (
		<View className="flex w-full items-start justify-center bg-transparent mt-4">
			<Text className="text-neutral-100 text-lg my-3 px-4">
				Suggested Location
			</Text>
			{locations?.length > 0 ? (
				<FlatList
					data={locations}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => (
						<LocationCard
							location={item}
							setSelectedLocation={setSelectedLocation}
							setLocationList={setLocationList}
						/>
					)}
					keyExtractor={(item) => item?.id.toString()}
				/>
			) : (
				<View className="items-center justify-center self-center">
					<Text className="text-neutral-100 text-sm mb-3 mt-6 px-4">
						No location found
					</Text>
					<Ionicons name="warning-outline" size={150} color="#99f6e4" />
				</View>
			)}
		</View>
	);
}
