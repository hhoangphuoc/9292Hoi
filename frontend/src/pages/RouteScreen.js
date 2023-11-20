import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect } from "react";

// import SearchBar from "../components/SearchBar";
// import LocationList from "../components/LocationList";

//icons
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import { BASE_URL, ENDPOINTS, TOKEN } from "../constant";

export default function RouteScreen({ route, navigation }) {
	const Header = () => {
		return (
			<View
				className="flex flex-row items-center justify-between bg-transparent w-full px-4"
				// style={{ width: "100%" }}
			>
				<View className="flex-row items-center justify-center px-2">
					<TouchableOpacity
						className="items-center justify-center p-2"
						onPress={() => navigation.goBack()}
					>
						<Ionicons name="arrow-back" size={24} color="white" />
					</TouchableOpacity>
					<Text className="text-neutral-100 text-lg ml-3">
						Route Information
					</Text>
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

	const LocationInfo = ({ fromName, toName }) => {
		return (
			<View className="flex flex-col items-center justify-center bg-neutral-600 ml-3 mr-8 px-4 py-4">
				<View className="flex flex-row items-center justify-start py-2">
					<View className="flex-row items-center justify-center">
						<FontAwesome5 name="map-marker-alt" size={24} color="white" />
					</View>
					<View className="flex-row items-center justify-center ml-3">
						<Text className="text-neutral-100 text-lg">{fromName}</Text>
					</View>
				</View>
				<View className="flex flex-row items-center justify-start py-2">
					<View className="flex-row items-center justify-center">
						<FontAwesome5 name="map-marker-alt" size={24} color="white" />
					</View>
					<View className="flex-row items-center justify-center ml-3">
						<Text className="text-neutral-100 text-lg">{toName}</Text>
					</View>
				</View>
			</View>
		);
	};

	//fetch Journeys
	const { fromId, toId, fromName, toName } = route.params;
	console.log(
		"fromId:",
		fromId,
		"toId:",
		toId,
		" - fromName:",
		fromName,
		"toName:",
		toName
	);

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

	const [journeyList, setJourneyList] = useState([]);

	//fetch the journey list once on mount
	useEffect(() => {
		console.log("fetching journeys list...");
		fetchJourneys(fromId, toId);

		return () => {};
	}, []);

	return (
		<View className="flex-1 items-center bg-neutral-900 pt-8">
			<Header />
			<LocationInfo fromName={fromName} toName={toName} />
		</View>
	);
}
