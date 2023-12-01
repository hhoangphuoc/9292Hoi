import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect, useRef } from "react";

import SearchBar from "../components/SearchBar";
import LocationList from "../components/LocationList";

import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useSelector } from "react-redux";

import { TOKEN_9292 } from "@env";

export default function LocationScreen({ navigation }) {
	//fetch the 9292 API Locations
	async function fetchLocations(query) {
		const headers = new Headers();
		headers.append("Authorization", `Token ${TOKEN_9292}`);

		const response = await fetch(
			`https://reisadvies-api-ast.9292.nl/v4/Locations?query=${query}&Rows=5`,
			{
				method: "GET",
				headers,
			}
		);

		const data = await response.json();
		setLocationList(data.locations);
	}

	const locationVoice = useSelector((state) => state.selectedVoice.voices[1]); //voices 1 contains the voice of location information

	const [fromAddress, setFromAddress] = useState(""); //Structure: {id, name, type, lat, lon, placeId, place}
	const [toAddress, setToAddress] = useState(""); //Structure: {id, name, type, lat, lon, placeId, place}
	const [locationList, setLocationList] = useState([]);
	const [selectedFromLocation, setSelectedFromLocation] = useState(null);
	const [selectedToLocation, setSelectedToLocation] = useState(null);

	//play the audio when page is loaded
	useEffect(() => {
		const sound = new Audio.Sound();

		const loadAndPlayAudio = async () => {
			try {
				await sound.loadAsync(locationVoice?.voiceUrl);
				await sound.playAsync();
			} catch (error) {
				console.error("AUDIO PLAY: ", error);
			}
		};

		loadAndPlayAudio();
		// triggerConfetti();

		return () => {
			sound.unloadAsync(); // Unload the sound when the component unmounts
		};
	}, []);

	useEffect(() => {
		if (selectedFromLocation === null && fromAddress) {
			// console.log("fetching from locations...");
			fetchLocations(fromAddress);
		} else if (selectedToLocation === null && toAddress) {
			// console.log("fetching to locations...");
			fetchLocations(toAddress);
		}
	}, [fromAddress, toAddress, selectedFromLocation, selectedToLocation]);

	return (
		<View className="flex-1 items-start bg-neutral-900 pt-20">
			<View>
				<Text className="text-neutral-100 text-2xl my-3 px-4">Where to?</Text>
			</View>
			<View className="flex-row items-start justify-center bg-neutral-800 mt-1 ml-3 mr-8 px-4 pt-2 pb-4">
				{/* an input text field with 2 rows - from and to */}
				<View className="flex flex-col justify-center items-center">
					<SearchBar
						addressType="From"
						placeholder="From: Address, Station, Stop,..."
						address={fromAddress}
						setAddress={setFromAddress}
						selectedLocation={selectedFromLocation}
					/>
					<View className="w-full h-[1px] ml-6 bg-neutral-500 mt-2"></View>
					<SearchBar
						addressType="To"
						placeholder="To: Address, Station, Stop,..."
						address={toAddress}
						setAddress={setToAddress}
						selectedLocation={selectedToLocation}
					/>
				</View>
				{/* a button to navigate to the route page, with the From and To address as the parameters */}
				<View className="flex justify-center self-center pl-4 z-10">
					<TouchableOpacity className="items-center justify-center self-center mt-2 pl-2">
						<Ionicons
							name="swap-vertical-outline"
							size={28}
							color="#f5f5f5"
							className="mr-3"
						/>
					</TouchableOpacity>
				</View>
			</View>

			{fromAddress && !selectedFromLocation ? (
				<LocationList
					locations={locationList}
					setSelectedLocation={setSelectedFromLocation}
					setLocationList={setLocationList}
					// setAddress={setFromAddress}
					addressType="From"
				/>
			) : toAddress && !selectedToLocation ? (
				<LocationList
					locations={locationList}
					setSelectedLocation={setSelectedToLocation}
					setLocationList={setLocationList}
					// setAddress={setToAddress}
					addressType="To"
				/>
			) : selectedFromLocation && selectedToLocation ? (
				<TouchableOpacity
					className="items-center justify-center self-center mb-3 mt-6"
					onPress={() => {
						console.log("From Address id: ", selectedFromLocation?.id);
						console.log("To Address id: ", selectedToLocation?.id);
						navigation.navigate("RouteScreen", {
							fromId: selectedFromLocation?.id,
							toId: selectedToLocation?.id,
							fromName: selectedFromLocation?.displayName,
							toName: selectedToLocation?.displayName,
						});
					}}
				>
					<View className="flex flex-row items-center justify-center bg-teal-400 rounded-md px-2">
						<Text className="text-neutral-900 text-base pl-2 pr-1 py-2">
							{selectedFromLocation?.displayName}
							{" to "}
							{selectedToLocation?.displayName}
						</Text>
						<Ionicons name="navigate" color="#171717" size={20} />
					</View>
				</TouchableOpacity>
			) : (
				<View className="items-center justify-center self-center mb-3 mt-6">
					<Ionicons name="trail-sign-outline" size={150} color="#99f6e4" />
					<Text className="text-neutral-100 text-sm  px-4">
						Find your suitable locations, and route
					</Text>
				</View>
			)}
		</View>
	);
}
