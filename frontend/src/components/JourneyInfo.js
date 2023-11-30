import {
	FlatList,
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from "react-native";

import React, { useEffect, useState } from "react";

import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const StopSection = ({
	legs,
	stop,
	coinsPerLeg,
	coin,
	setProgress,
	totalCoins,
}) => {
	const navigation = useNavigation();
	const modalityIcon = {
		Bus: "bus-outline",
		Train: "train-outline",
		Walking: "walk-outline",
		Tram: "tram",
		Subway: "subway-outline",
	};

	const handlePress = () => {
		setProgress((prevCoins) => Math.min(prevCoins + coin, totalCoins)); //set the value of the progress bar to
	};
	// useEffect(() => {}, [navigation]);
	return (
		<View className="flex flex-col justify-center px-1 pt-2">
			{/* Row 1: Departure time + Rounded Circle (Square if last time ) + Location */}
			<View className="flex flex-row items-center justify-start">
				<Text className="text-neutral-100 text-sm pl-1 mr-3">
					{stop?.departureTimeLeg.slice(11, 16)}
				</Text>
				{/* Rounded Circle */}
				<View className="w-3 h-3 rounded-lg border-[1px] border-neutral-100 bg-neutral-800 mx-[10px]" />
				<View className="flex flex-row items-center justify-start flex-grow">
					<TouchableOpacity
						className="flex flex-row items-center justify-between"
						onPress={() =>
							navigation.navigate("MapScreen", {
								legs: legs,
								// stop: stop,
								// coin: coin,
								coinsPerLeg: coinsPerLeg,
								// totalCoins: totalCoins,
							})
						}
					>
						<Text
							className="text-neutral-100 text-base mx-3"
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							{stop?.calls_info.length > 0
								? stop?.calls_info[0].displayName
								: stop?.startStopLeg}
						</Text>

						<FontAwesome5 name="map" size={20} color="#99f6e4" />
						{/* <Ionicons name="navigate" size={20} color="#99f6e4" /> */}
						{/* <Text className="text-teal-100 text-sm underline ml-1">
							{">"} route
						</Text> */}
					</TouchableOpacity>
				</View>
			</View>

			{/* Row 2: Modality Icon + Either Dotted or Solid Line + Duration */}
			<View className="flex flex-row items-center justify-start">
				<View className="flex items-center justify-center mx-3 py-10">
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
				<View className="flex flex-row items-center justify-between flex-grow mx-2">
					<Text className="text-neutral-100 text-sm text-left">
						~ {stop?.durationLeg} min
					</Text>
					<TouchableOpacity
						className="flex flex-row items-center justify-center py-3 px-2"
						onPress={() => handlePress({ coin })}
					>
						<Text className=" text-amber-400 text-base mr-0.5"> + </Text>
						<FontAwesome5 name="coins" size={16} color="#eab308" />
						<Text className=" text-amber-400 text-base ml-1">{coin}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default function JourneyInfo({
	legs,
	coins,
	setProgress,
	totalDuration,
}) {
	// divide the coins by the toal duration and assign it to each leg
	const coinsPerLeg = legs.map((leg) => {
		return Math.round((leg.durationLeg / totalDuration) * coins);
	});

	return (
		<ScrollView className="flex-1 w-full mt-4 bg-neutral-900 mx-2 px-2">
			{legs.map((stop, index) => (
				<View key={index} className="mr-3">
					<StopSection
						legs={legs}
						stop={stop}
						coinsPerLeg={coinsPerLeg}
						coin={coinsPerLeg[index]}
						setProgress={setProgress}
						totalCoins={coins}
					/>
				</View>
			))}
		</ScrollView>
	);
}
