import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

//icons
import {
	Ionicons,
	FontAwesome5,
	MaterialIcons,
	AntDesign,
} from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useSelector } from "react-redux";

import { BASE_URL, ENDPOINTS, TOKEN } from "../constant";

const journeyData = require("../data/journey_info_1.json"); //TODO: change back to journey_info.json

//functions
import {
	formatJourney,
	handlePlay,
	handleStop,
} from "../constant/helperFunctions";

//Header - TODO: change to component
const Header = () => {
	return (
		<View
			className="flex flex-row items-center justify-between bg-red-500 w-full px-4"
			// style={{ width: "100%" }}
		>
			<View className="flex-row items-center justify-center px-2">
				<TouchableOpacity
					className="items-center justify-center p-2"
					onPress={() => navigation.goBack()}
				>
					<Ionicons name="arrow-back" size={24} color="white" />
				</TouchableOpacity>
				<Text className="text-neutral-100 text-lg ml-3">Route Information</Text>
			</View>

			<View className="flex-row items-center justify-center ml-3 mr-8 px-3">
				<TouchableOpacity
					className="items-center justify-center p-2"
					// onPress={() => navigation.navigate("Location")}
				>
					<MaterialIcons name="tune" size={24} color="black" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

// Location Info: From and To locations
const LocationInfo = ({ fromName, toName }) => {
	return (
		<View className="flex flex-col items-start justify-center bg-neutral-800 mx-3 px-4 py-4 rounded-md mt-4">
			<View className="flex flex-row items-center justify-start py-2">
				<View className="flex-row items-center justify-center">
					<FontAwesome5 name="map-marker-alt" size={20} color="#f5f5f5" />
				</View>
				<View className="flex-row items-center justify-center ml-3">
					<Text className="text-neutral-100 text-lg">{fromName}</Text>
				</View>
			</View>
			<View className="w-full h-[1px] bg-neutral-600 my-2" />
			<View className="flex flex-row items-center justify-start py-2">
				<View className="flex-row items-center justify-center">
					<FontAwesome5 name="map-marker-alt" size={20} color="#f5f5f5" />
				</View>
				<View className="flex-row items-center justify-center ml-3">
					<Text className="text-neutral-100 text-lg">{toName}</Text>
				</View>
			</View>
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

// Journey Card: display the journey information
const JourneyCard = ({ fromName, toName, journey, navigation }) => {
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
				<Text className="text-neutral-100 text-base ml-1 mb-2">{"."}</Text>
			</View>
		);
	});
	return (
		<View key={formattedJourney?.journeyId}>
			<TouchableOpacity
				className="flex flex-col bg-neutral-800 px-2 py-2 rounded-sm mb-2"
				// key={formattedJourney?.journeyId}
				onPress={() =>
					navigation.navigate("JourneyDetails", {
						fromName: fromName,
						toName: toName,
						journey: journey,
					})
				}
			>
				<View className="flex flex-row items-center justify-between py-1 px-1">
					{/* Row 1: departure time and arrival time + duration */}
					{/* Section 1: Departure time, arrival time */}
					<View className="flex flex-row items-center justify-between py-1">
						{/* Departure time */}
						<View className="flex flex-row items-center justify-center">
							<Text className="text-neutral-100 text-lg mr-2">
								{formattedJourney?.dTime}
							</Text>
							<AntDesign name="arrowright" size={24} color="#f5f5f5" />
							<Text className="text-neutral-100 text-lg ml-2">
								{formattedJourney?.aTime}
							</Text>
						</View>
					</View>

					{/* Section 2: Duration*/}
					<View className="flex flex-row items-center justify-center">
						{/* <View className="flex-row items-center justify-center"></View> */}
						<FontAwesome5 name="clock" size={15} color="#f5f5f5" />
						<Text className="text-neutral-100 text-base ml-1">
							{formattedJourney?.durationStr}
						</Text>
					</View>
				</View>

				<View className="flex flex-row items-center justify-between px-1">
					{/* List of modalities */}
					<View className="flex flex-row items-center justify-center pt-1">
						{journeyIcons}
					</View>
					{/* Coin*/}
					<View className="flex flex-row items-center justify-center py-1">
						<FontAwesome5 name="euro-sign" size={15} color="#f5f5f5" />
						<Text className="text-neutral-100 text-base ml-1 mr-4">
							{formattedJourney?.price}
						</Text>
						<FontAwesome5 name="coins" size={18} color="#f5f5f5" />
						<Text className="text-neutral-100 text-base ml-1">
							+ {formattedJourney?.coins}
						</Text>
					</View>
				</View>
				{/* <View className="flex flex-row items-center justify-end pt-2">
					<FontAwesome5 name="coins" size={18} color="#f5f5f5" />
					<Text className="text-neutral-100 text-base ml-2 mr-1">
						{formattedJourney?.coins}
					</Text>
				</View> */}
			</TouchableOpacity>
		</View>
	);
};

export default function RouteScreen({ route, navigation }) {
	//fetch Journeys
	const { fromId, toId, fromName, toName } = route.params;
	console.log(
		"fromId:",
		fromId,
		"toId:",
		toId,
		"fromName:",
		fromName,
		"toName:",
		toName
	);

	const findRouteVoice = useSelector((state) => state.selectedVoice.voices[2]); //voices 1 contains the voice of route message

	//play the audio when page is loaded
	useEffect(() => {
		const sound = new Audio.Sound();

		const loadAndPlayAudio = async () => {
			try {
				await sound.loadAsync(findRouteVoice.voiceUrl);
				await sound.playAsync();
			} catch (error) {
				console.error("AUDIO PLAY: ", error);
			}
		};

		loadAndPlayAudio();

		return () => {
			sound.unloadAsync(); // Unload the sound when the component unmounts
		};
	}, []);

	//use state to store the journey list
	const [journeyList, setJourneyList] = useState([
		// journeyData.selected_journey,
	]);

	async function fetchJourneys(fromId, toId) {
		const headers = new Headers();
		headers.append("Authorization", `Token ${TOKEN}`);

		const response = await fetch(
			`https://reisadvies-api-ast.9292.nl/v4/journeys?fromId=${fromId}&toId=${toId}`,
			{
				method: "GET",
				headers,
			}
		);

		const data = await response.json();
		console.log("Journey list:", data.journeys);
		setJourneyList(data.journeys);
	}

	// //fetch the journey list
	useEffect(() => {
		if (
			fromId === "amsterdam/bus-tramhalte-alexanderplein" &&
			toId === "station-rotterdam-centraal" &&
			journeyData.selected_journey.length > 0
		) {
			console.log("fetching constant data journeys...");
			setJourneyList(journeyData.selected_journey);
		} else {
			console.log("fetching journeys from 9292API...");
			fetchJourneys(fromId, toId);
		}
		console.log("Number of Journey:", journeyList.length);

		return () => {};
	}, []);

	return (
		<View className="flex-1 justify-center w-full bg-neutral-900 pt-8">
			<Header />
			<LocationInfo fromName={fromName} toName={toName} />

			<ScrollView className="flex flex-col mx-2 px-2 pt-2 mt-4">
				{journeyList.map((journey, index) => {
					//get the list of journey which have journey_type as "normal_journey"
					const normalJourneys = journeyList.filter(
						(journey) => journey.journey_type === "normal_journey"
					);

					return (
						<View key={index} className="flex flex-col">
							{index === 0 ? (
								<View>
									<Text className="text-teal-200 text-lg mb-1">
										Shortest Journey
									</Text>
									<JourneyCard
										fromName={fromName}
										toName={toName}
										journey={journey}
										navigation={navigation}
									/>
								</View>
							) : index === 1 ? (
								<View>
									<Text className="text-teal-200 text-lg mt-2 mb-1">
										Minimal Transits
									</Text>
									<JourneyCard
										fromName={fromName}
										toName={toName}
										journey={journey}
										navigation={navigation}
									/>
								</View>
							) : index === 2 ? (
								<View>
									<Text className="text-teal-200 text-lg mt-2 mb-1">
										Cheapest Journey
									</Text>
									<JourneyCard
										fromName={fromName}
										toName={toName}
										journey={journey}
										navigation={navigation}
									/>
									<View className="w-full h-[1px] bg-neutral-600 my-2" />
									<Text className="text-neutral-100 text-lg mt-2 mb-1">
										All Journeys
									</Text>
								</View>
							) : (
								<JourneyCard
									fromName={fromName}
									toName={toName}
									journey={journey}
									navigation={navigation}
								/>
							)}
						</View>
					);
				})}
			</ScrollView>
		</View>
	);
}
