import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
	Ionicons,
	AntDesign,
	FontAwesome5,
	MaterialIcons,
} from "@expo/vector-icons";

import { Audio } from "expo-av";

//function
import {
	formatJourney,
	handlePlay,
	handleStop,
} from "../constant/helperFunctions";
//progress bar
import * as Progress from "react-native-progress";

import { useSelector } from "react-redux";

//components
import JourneyInfo from "../components/JourneyInfo";
// Header - TODO: change to component
const Header = ({ navigation, fromName, toName }) => {
	return (
		<View
			className="flex flex-row items-center justify-center mt-12 pt-4 pb-2 px-4 ml-1"
			// style={{ width: "100%" }}
		>
			<Text className="text-neutral-100 mr-2">{fromName}</Text>
			<AntDesign name="arrowright" size={24} color="#f5f5f5" />
			<Text className="text-neutral-100 ml-2">{toName}</Text>
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

	const routeInfoVoice = useSelector((state) => state.selectedVoice.voices[2]); //voices 2 contains the voice of route information
	const [sound, setSound] = useState();

	const [progress, setProgress] = useState(0);
	const [finished, setFinished] = useState(false);

	//journey info
	const formattedJourney = formatJourney(journey);
	const journeyIcons = formattedJourney?.modalities.map((modality, index) => {
		return (
			<View
				key={index}
				className="flex flex-row items-center justify-center mr-1"
			>
				{modality === "Tram" ? (
					<MaterialIcons name="tram" size={22} color="#f5f5f5" />
				) : (
					<Ionicons name={modalityIcon[modality]} size={22} color="#f5f5f5" />
				)}
				<Text className="text-neutral-100 text-sm ml-1 mb-2">{"."}</Text>
			</View>
		);
	});

	// const coins = formattedJourney?.coins;
	const legs = formattedJourney?.legs;
	const coins = formattedJourney?.coins;
	const duration = formattedJourney?.duration;

	useEffect(() => {}, [progress, coins, finished]);

	return (
		<View className="flex-1 items-start justify-center bg-neutral-900 pt-8">
			<Header navigation={navigation} fromName={fromName} toName={toName} />
			<View className="w-1/2 self-center h-[1px] bg-neutral-400 my-2" />

			{/* General Journey Info Section */}
			<View className="flex flex-row bg-neutral-800 mr-4 mt-2 items-start rounded-md">
				{/* Column 1: Coins */}
				<View className="flex flex-col justify-center items-center py-2">
					<Text className="text-neutral-100 px-8 pt-1 ">Coins Earned</Text>
					<View className="flex flex-row items-center justify-end py-3 px-2">
						<FontAwesome5 name="coins" size={24} color="#eab308" />
						<Text className=" text-amber-400 ml-2">
							{/* {" "}
							100 */}
							{formattedJourney?.coins}
						</Text>
					</View>
				</View>
				{/* Column 2: Journey General Info */}
				<View className="h-2/3 self-center w-[1px] bg-neutral-400 mr-4" />

				<View className="flex flex-col items-start justify-center py-2">
					<View className="flex flex-row items-center self-center py-1 px-2">
						{/* Departure time */}
						<Text className="text-neutral-100 mr-2">
							{formattedJourney?.dTime}
						</Text>
						<AntDesign name="arrowright" size={24} color="#f5f5f5" />
						<Text className="text-neutral-100 ml-2">
							{formattedJourney?.aTime}
						</Text>
					</View>
					{/* <View className="flex flex-row items-center justify-center"></View> */}
					<View className="flex flex-row items-center self-center justify-center py-1 px-2">
						<View className="flex-row items-center justify-center">
							<FontAwesome5 name="clock" size={14} color="#f5f5f5" />
							<Text className="text-neutral-100 text-sm ml-1">
								{formattedJourney?.durationStr}
							</Text>
						</View>
						<View className="flex flex-row items-center justify-center py-1 px-2 ml-1">
							<FontAwesome5 name="euro-sign" size={14} color="#f5f5f5" />
							<Text className="text-neutral-100 text-sm ml-1">
								{formattedJourney?.price}
							</Text>
						</View>
					</View>
				</View>
			</View>
			{/* Modalities List */}
			<View className="flex flex-row self-center justify-center py-2">
				{journeyIcons}
			</View>

			{/* Journey Details Section */}
			<Text className="text-neutral-100 text-xl text-left px-4 pt-4">
				Journey Details
			</Text>
			<JourneyInfo
				legs={legs}
				coins={coins}
				totalDuration={duration}
				setProgress={setProgress}
			/>
			{progress / coins >= 1 ? (
				<TouchableOpacity
					className="flex flex-row items-center bg-neutral-800 justify-center w-full rounded-md py-3 px-2"
					onPress={() => {
						setFinished(true);
						navigation.navigate("Home");
					}}
				>
					<Text className="text-green-400 text-base ml-2 mr-2 mb-1">
						Congrats! You earned
						<Text className="text-amber-400" style={{ fontWeight: "bold" }}>
							{" "}
							{coins} coins
						</Text>
					</Text>
					{/* <FontAwesome5 name="arrowright" size={24} color="#22c55e" /> */}
					{/* <FontAwesome5
						name="arrow-alt-circle-right"
						size={20}
						color="#f5f5f5"
					/> */}
					<AntDesign name="rightcircleo" size={20} color="#f5f5f5" />
				</TouchableOpacity>
			) : (
				<View className="flex flex-row items-center bg-neutral-800 justify-center w-full rounded-md py-4 px-2">
					<Progress.Bar
						progress={progress / coins}
						width={250}
						height={20}
						color="#99f6e4"
						borderColor="#f5f5f5"
						borderWidth={1}
						borderRadius={10}
					/>
					<Text className="text-neutral-100 text-base ml-2 mr-1">
						{Math.floor((progress / coins) * 100)}%
					</Text>
					<FontAwesome5 name="flag-checkered" size={24} color="#99f6e4" />
				</View>
			)}

			{/* Navigate Button */}
			{/* <TouchableOpacity
				className="flex flex-row items-center bg-neutral-800 justify-center w-full rounded-md py-1 px-4"
				onPress={
					//play the audio with route guidance
					() => {
						handlePlay(routeInfoVoice, setSound);
					}
				}
			>
				<Text className="text-neutral-100 text-base mr-2">
					Route Instruction
				</Text>
				<Ionicons name="navigate-outline" size={16} color="#f5f5f5" />
			</TouchableOpacity> */}
			{/* </View> */}
		</View>
	);
}
