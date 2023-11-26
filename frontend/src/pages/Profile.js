import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

//constants
import { rankCategories } from "../constant";

//icons
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function Profile({ route, navigation }) {
	//TODO: replace with the real user data
	const userData = {
		name: "9292 Test User",
		coins: 100,
		historyJourneys: [], //todo: connected with journeys list later
	};
	const maxCoins = 1000;

	const [locations, setLocations] = useState([]);

	let rank = {};

	switch (userData?.coins) {
		case userData.coins < 100:
			rank = rankCategories[0]; //bronze
			break;
		case userData.coins < 200 && userData.coins >= 100:
			rank = rankCategories[1]; //silver
			break;
		case userData.coins < 300 && userData.coins >= 200:
			rank = rankCategories[2]; //gold
			break;
		case userData.coins < 400 && userData.coins >= 300:
			rank = rankCategories[3]; //platinum
			break;
		case userData.coins >= 400:
			rank = rankCategories[4]; //diamond
			break;
		default:
			rank = rankCategories[0]; //bronze
			break;
	}

	return (
		<View className="flex-1 items-center bg-neutral-900 pt-28 px-2">
			{/* User name and profile picture */}
			<View className="flex flex-row items-center justify-center px-4 pb-6">
				<Image
					className="w-12 h-12 rounded-full"
					source={require("../../assets/images/9292.png")}
				/>
				{/* <Ionicons name="person-outline" size={30} color="white" /> */}
				<Text className="text-neutral-100 text-lg ml-2">{userData?.name}</Text>
			</View>
			<View className="w-full h-[1px] bg-neutral-400"></View>
			{/* Card showing general information about coins and rank */}
			<View className="flex-col justify-center rounded-xl bg-neutral-800 my-4 w-full">
				<View className="flex flex-row items-center justify-between pt-6 pb-2 px-5">
					<View className="flex flex-row items-center justify-center">
						<Text className="text-center text-base text-neutral-100">
							Total Rewards
						</Text>
					</View>
					<View className="flex flex-row items-center justify-center">
						<Text className="text-center text-lg text-neutral-100 mr-2">
							{userData.coins}
						</Text>
						<FontAwesome5 name="coins" size={30} color="#eab308" />
					</View>
				</View>
				<View className="flex flex-row items-start pb-2 px-5">
					<Text className="text-center text-base text-neutral-100 my-2">
						{rank.name}
					</Text>
					<Slider
						disabled={true}
						style={{ width: 300, height: 50 }}
						minimumValue={rank.min}
						maximumValue={rank.max}
						minimumTrackTintColor={rank.color}
						maximumTrackTintColor={rank.color}
						thumbTintColor={rank.color}
						value={(userData.coins / maxCoins) * 10}
					/>
				</View>
			</View>
			{/* A section that contains 2 button to redeem page and home page */}
			<View className="flex flex-col justify-center bg-transparent my-1 w-full">
				<View className="flex flex-row items-center justify-between px-2">
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("Shop", {
								coins: userData.coins,
								historyJourneys: userData.historyJourneys,
							})
						}
						className="flex flex-row items-center justify-center bg-neutral-800 rounded-lg py-4 px-4"
					>
						<FontAwesome5 name="store" size={20} color="#99f6e4" />
						<Text className="text-center text-sm text-neutral-300 ml-3">
							Redeem Rewards
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("Home");
						}}
						className="flex flex-row items-center justify-center bg-neutral-800 rounded-lg py-4 px-4 ml-2"
					>
						<FontAwesome5 name="search-location" size={20} color="#99f6e4" />
						<Text className="text-center text-base text-neutral-300 ml-3">
							Continue Travel
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Card showing travel history */}
			<View className="flex w-full items-start justify-center bg-transparent mt-4">
				<Text className="text-neutral-100 text-lg my-3 px-4">
					Travel History
				</Text>
				{locations.length > 0 ? (
					<View></View>
				) : (
					// <FlatList
					// 	data={locations}
					// 	showsVerticalScrollIndicator={false}
					// 	showsHorizontalScrollIndicator={false}
					// 	renderItem={({ item }) => (
					// 		<View>
					// 			<Text>History</Text>
					// 		</View>
					// 	)}
					// 	keyExtractor={(item) => item?.id.toString()}
					// />
					<View className="items-center justify-center self-center">
						<Text className="text-neutral-100 text-sm mb-3 mt-6 px-4">
							No recent journey was found
						</Text>
						{/* <FontAwesome5 name="history" size={30} color="#99f6e4" /> */}
					</View>
				)}
			</View>
		</View>
	);
}
