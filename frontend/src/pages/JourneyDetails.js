import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
	Ionicons,
	AntDesign,
	FontAwesome5,
	MaterialIcons,
} from "@expo/vector-icons";

//function
import { formatJourney } from "./RouteScreen";

//components
import JourneyInfo from "../components/JourneyInfo";
// Header - TODO: change to component
const Header = ({ navigation, fromName, toName }) => {
	return (
		<View
			className="flex flex-row items-center justify-center bg-red w-full mt-12 pt-4 pb-2 px-4"
			// style={{ width: "100%" }}
		>
			<Text className="text-neutral-100 text-xl mr-2">{fromName}</Text>
			<AntDesign name="arrowright" size={24} color="#f5f5f5" />
			<Text className="text-neutral-100 text-xl ml-2">{toName}</Text>
		</View>
	);
};

const modalityIcon = {
	Bus: "bus-outline",
	Train: "train-outline",
	Walking: "walk-outline",
	Tram: "tram",
	Subway: "subway-outline",
};

export default function JourneyDetails({ route, navigation }) {
	const { fromName, toName, journey } = route.params;
	console.log("Selected journey", journey);

	const formattedJourney = formatJourney(journey);
	const journeyIcons = formattedJourney?.modalities.map((modality, index) => {
		return (
			<View className="flex flex-row items-center justify-center mr-1">
				{modality === "Tram" ? (
					<MaterialIcons name="tram" size={22} color="#f5f5f5" />
				) : (
					<Ionicons name={modalityIcon[modality]} size={22} color="#f5f5f5" />
				)}
				<Text className="text-neutral-100 text-sm ml-1 mb-2">{"."}</Text>
			</View>
		);
	});

	return (
		<View className="flex-1 items-start justify-center bg-neutral-900 pt-8">
			<Header navigation={navigation} fromName={fromName} toName={toName} />
			<View className="w-1/2 self-center h-[1px] bg-neutral-400 my-2" />

			{/* General Journey Info Section */}
			<View className="flex flex-row bg-neutral-800 mx-3 py-2 px-4 mt-2 items-start rounded-md">
				{/* Column 1: Coins */}
				<View className="flex flex-col justify-center items-center">
					<Text className="text-neutral-100 text-lg px-8 pt-1 ">
						Coins Earned
					</Text>
					<View className="flex flex-row items-center justify-end py-3 px-2">
						<FontAwesome5 name="coins" size={24} color="#eab308" />
						<Text className=" text-amber-400 text-xl ml-1">
							{" "}
							100
							{/* {formattedJourney?.coins} */}
						</Text>
					</View>
				</View>
				{/* <View className="flex flex-col"> */}
				{/* Column 2: Journey General Info */}
				<View className="h-2/3 self-center w-[1px] bg-neutral-400 mr-4" />

				<View className="flex flex-col items-start justify-center">
					<View className="flex flex-row items-center self-center py-1 px-2">
						{/* Departure time */}
						<Text className="text-neutral-100 text-lg mr-2">
							{formattedJourney?.dTime}
						</Text>
						<AntDesign name="arrowright" size={24} color="#f5f5f5" />
						<Text className="text-neutral-100 text-lg ml-2">
							{formattedJourney?.aTime}
						</Text>
					</View>
					{/* <View className="flex flex-row items-center justify-center"></View> */}
					<View className="flex flex-row items-center self-center justify-center py-1 px-2">
						<View className="flex-row items-center justify-center">
							<FontAwesome5 name="clock" size={14} color="#f5f5f5" />
							<Text className="text-neutral-100 text-sm ml-1">
								{formattedJourney?.duration}
							</Text>
						</View>
						<View className="flex flex-row items-center justify-center py-1 px-2 ml-3">
							<FontAwesome5 name="euro-sign" size={14} color="#f5f5f5" />
							<Text className="text-neutral-100 text-sm ml-1">
								{formattedJourney?.price}
							</Text>
						</View>
					</View>
				</View>
			</View>
			<View className="flex flex-row self-center justify-center py-2">
				{journeyIcons}
			</View>

			{/* Journey Details Section */}
			<Text className="text-neutral-100 text-xl text-left px-4 pt-4">
				Journey Details
			</Text>
			<JourneyInfo legs={formattedJourney?.legs} />

			{/* Navigate Button */}
			<TouchableOpacity
				className="flex flex-row items-center bg-neutral-800 justify-center w-full rounded-md py-1 px-4"
				onPress={() => navigation.navigate("Home")}
			>
				<Text className="text-neutral-100 text-base mr-2">Navigate</Text>
				<Ionicons name="navigate-outline" size={16} color="#f5f5f5" />
			</TouchableOpacity>
			{/* </View> */}
		</View>
	);
}
