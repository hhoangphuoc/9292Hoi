import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect } from "react";

// import SearchBar from "../components/SearchBar";
// import LocationList from "../components/LocationList";

//icons
import { Ionicons } from "@expo/vector-icons";

import { BASE_URL, ENDPOINTS, TOKEN } from "../constant";

export default function RouteScreen({ route, navigation }) {
	//fetch Journeys
	const { fromId, toId } = route.params;

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
	return (
		<View className="flex-1 items-center bg-neutral-900 pt-8">
			<Text className="text-neutral-100 text-lg my-3 px-4">Route Screen</Text>
		</View>
	);
}
