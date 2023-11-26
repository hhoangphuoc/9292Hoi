import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";

import React from "react";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const StopSection = ({ stop }) => {
	const modalityIcon = {
		Bus: "bus-outline",
		Train: "train-outline",
		Walking: "walk-outline",
		Tram: "tram",
		Subway: "subway-outline",
	};
	return (
		<View className="flex flex-col justify-center px-4 py-2">
			{/* Row 1: Departure time + Rounded Circle (Square if last time ) + Location */}
			<View className="flex flex-row items-center justify-start">
				<Text className="text-neutral-100 text-sm pl-1 mr-3">
					{stop?.departureTimeLeg.slice(11, 16)}
				</Text>
				<View className="w-3 h-3 rounded-lg border-[1px] border-neutral-100 bg-neutral-800 mx-3" />
				<Text
					className="text-neutral-100 text-base mx-3"
					numberOfLines={2}
					ellipsizeMode="tail"
				>
					{stop?.calls_info.length > 0
						? stop?.calls_info[0].displayName
						: stop?.startStopLeg}
				</Text>
			</View>

			{/* Row 2: Modality Icon + Either Dotted or Solid Line + Duration */}
			<View className="flex flex-row items-center justify-start">
				<View className="flex items-center justify-center mx-3  py-6">
					{stop?.modality === "Tram" ? (
						<MaterialIcons
							name={modalityIcon[stop?.modality]}
							size={22}
							color="#f5f5f5"
						/>
					) : (
						<Ionicons
							name={modalityIcon[stop?.modality]}
							size={22}
							color="#f5f5f5"
						/>
					)}
				</View>
				{/* Either dotted or solid line */}
				{stop.modality === "Walking" ? (
					<View className="h-full w-[2px] border-[1px] border-neutral-400 border-dashed mx-5" />
				) : (
					<View className="h-full w-[2px] bg-teal-400 mx-5" />
				)}
				{/* Duration */}
				<Text className="text-neutral-100 text-sm text-left mx-2">
					~ {stop?.durationLeg} min
				</Text>
			</View>
		</View>
	);
};

export default function JourneyInfo({ legs }) {
	return (
		<ScrollView className="flex-1 w-full mt-4 bg-neutral-900 mx-2 px-2">
			{legs.map((stop, index) => (
				<StopSection key={index} stop={stop} />
			))}
		</ScrollView>
	);
}
