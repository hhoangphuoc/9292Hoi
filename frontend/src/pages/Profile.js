import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";

//constants
import { rankCategories } from "../constant";
//icons
import {
	Ionicons,
	FontAwesome5,
	MaterialCommunityIcons,
} from "@expo/vector-icons";

//data
import { getTravelHistory, getTotalCoins } from "../api/travelhistory";

export default function Profile({ route, navigation }) {
	//TODO: replace with the real user data
	// const userData = {
	// 	name: "9292 Test User",
	// 	coins: 400,
	// 	historyJourneys: [], //todo: connected with journeys list later
	// };

	const defaultJourneyList = [
		{
			Co2Emission: 0.118,
			arrival: "Rotterdam Centraal",
			arrivalTime: "12:06",
			coinsCollected: 76,
			date: "2023-11-17",
			departure: "Alexanderplein",
			departureTime: "11:08",
			fareInCents: 19.58,
			journeyId:
				"C9wAAICqqqrq_3QX8FuYRaiam4Wb683DDTzCA9TdA8IdIiCO4mYS7gqgpmqgC0Q4BISo7PbX1XMMBzggHIYXDMPciR13Q6Jf_qDDRCczEiioRDUvpSzl4iSlqltVt_dt29RyXt0JqYSAAjoTQ56S8W6Hv_s8nikcvo_JTxGUy9YWsMFAoEQBGxNi2hlLoLrjXvDjdgAFOMZEYcDx4ZxjmQKOV7SJSrT0i26gMFkyDgrYRk0X7G9K0GUHSGNMexej6dJRQmOjb_TeLLpPk66rvqcYzdlYk276qXef00Flj1f_c-j7PKHrp8qeqlefg6Pb2g-p4JXu6UN_bdb6S59X3WymSZvV82ymp93xnauKF1wLZt5xVXEjuRbM_HLcs2Qp5o-8bEQr6iXzYDMHtGykQB6FYIwDhzQwFHDyf0IQE-YLlcGnlLJd9uRSQLRQwIfB7QDKZWv_DQ",
		},
		{
			Co2Emission: 0.14,
			arrival: "Rotterdam Centraal",
			arrivalTime: "12:04",
			coinsCollected: 95,
			date: "2023-11-17",
			departure: "Alexanderplein",
			departureTime: "10:37",
			fareInCents: 17.2,
			journeyId:
				"C70AAICqqqrq_3QX8FuYRaiam0MY6M3dDRzAws3DPdwNPM5iZhLuCqCmaqAqCuEOAaFQsruqqecYDsMHwgccYBhg3mDOUBK__EGNTJ2eCBQUoljmUubyvZNSlZUqq9eqWpVyWbwIqYSADGodfJxZO3vAx2ecevLHnwu7OYCy0ZgMdugJlMhgp33ggzYEajreeTc1IyjAKTD5Eae3PoacPU53NEw5GnqgHcnPhrSFDJrQ0g2Hp5K00QG1GPjuYlq61cSoTfBttZNB-635vh4GCkH32mh-6qfOLvJDYS9393schjijHbbCdsWHi97Sc-vGVrhdb6771XazPi8W7f7wVYqU0uV0TjKVolymhGGckucxQQada_JxAmNDKPeOc_ZyPpBlj2ggg6vGZgRlozH_",
		},
		{
			Co2Emission: 0.197,
			arrival: "Rotterdam Centraal",
			arrivalTime: "12:04",
			coinsCollected: 120,
			date: "2023-11-17",
			departure: "Alexanderplein",
			departureTime: "10:39",
			fareInCents: 18.4,
			journeyId:
				"i88AAICqqqrq_3QXsFuYRaiaaYBb6M08LBzCw83DPdwNPM7iZhruCqCmaqAqCuEOAaEqu_W6eo7HAw4Ih-EAwwBzJ3bcFol--YMWSfV6UiChZGVVcF7wRc-5FLUU9WNdPwtelQ-MS8Ygh1YHH2fSzm7x9hmns_K7nyO5OYC00ZgcVugVSJbDSvtAW20UyO585920HkECToGUH3F6OsdQkMfpioZUgUbd0I7Kz0ZpCzmsQ6cuONyVaBsdwA4D7d1Epy6tItQm-A5vb9B-a7o2w6BC0GdtNN31iwcX6aCUx6v73Q1DnNEOUyn78sNFb9X91Y2p4E67PG0Wb02zybJu1b03bZZ1m-2XYCmlZSrLVC2SIOAc94fEk2CiSunlmTHGRR1nxhOGcUqexgQ59O4dEAJhjGDhHYURdjEoSx7RQA4njesRpI3G_Bs",
		},
	];

	const defaultTotalCoins = 300;

	const maxCoins = 1000;

	const [travelHistoryList, setTravelHistoryList] =
		useState(defaultJourneyList);
	const [totalCoins, setTotalCoins] = useState(defaultTotalCoins);

	// const [rank, setRank] = useState(rankCategories[0]);

	// useEffect(() => {
	// 	getTravelHistory()
	// 		.then((travelHistory) => {
	// 			console.log("Travel history List:", travelHistory);
	// 			setTravelHistoryList(travelHistory);
	// 		})
	// 		.catch((error) => {
	// 			console.log("Error: ", error);
	// 			setTravelHistoryList(defaultJourneyList);
	// 		});
	// 	getTotalCoins()
	// 		.then((totalCoins) => {
	// 			console.log("Total coins:", totalCoins);
	// 			setTotalCoins(totalCoins);
	// 		})
	// 		.catch((error) => {
	// 			console.log("Error: ", error);
	// 			setTotalCoins(300);
	// 		});

	// 	return () => {};
	// }, []);

	//update the rank based on the total coins
	// useEffect(() => {
	let rank = {};
	switch (totalCoins) {
		case totalCoins < 100:
			rank = rankCategories[0]; //bronze
			break;
		case totalCoins < 200 && totalCoins >= 100:
			rank = rankCategories[1]; //silver
			break;
		case totalCoins < 300 && totalCoins >= 200:
			rank = rankCategories[2]; //gold
			break;
		case totalCoins < 400 && totalCoins >= 300:
			rank = rankCategories[3]; //platinum
			break;
		case totalCoins >= 400:
			rank = rankCategories[4]; //diamond
			break;
		default:
			rank = rankCategories[0]; //bronze
			break;
	}
	// 	setRank(rank);
	// 	return () => {};
	// }, [totalCoins]);

	return (
		<View className="flex-1 items-center bg-neutral-900 pt-28 px-2">
			{/* User name and profile picture */}
			<View className="flex flex-row items-center justify-center px-4 pb-6">
				<Image
					className="w-12 h-12 rounded-full"
					source={require("../../assets/images/9292.png")}
				/>
				{/* <Ionicons name="person-outline" size={30} color="white" /> */}
				<Text className="text-neutral-100 text-base ml-2">Test User</Text>
			</View>
			<View className="w-full h-[1px] bg-neutral-400"></View>
			{/* Card showing general information about coins and rank */}
			<View className="flex-col justify-center rounded-xl bg-neutral-800 my-4 w-full">
				<View className="flex flex-row items-center justify-between pt-6 pb-2 px-5">
					<View className="flex flex-row items-center justify-center">
						<Text className="text-center text-sm text-neutral-100">
							Total Coins
						</Text>
					</View>
					<View className="flex flex-row items-center justify-center">
						<Text className="text-center text-base text-neutral-100 mr-2">
							{totalCoins ? totalCoins : 300}
						</Text>
						<FontAwesome5 name="coins" size={30} color="#eab308" />
					</View>
				</View>
				<View className="flex flex-row items-start pb-2 px-5">
					<Text className="text-center text-sm text-neutral-100 my-2">
						{rank?.name}
					</Text>
					<Slider
						disabled={true}
						style={{ width: 260, height: 50 }}
						// minimumValue={rank.min}
						// maximumValue={rank.max}
						minimumTrackTintColor={rank?.color}
						maximumTrackTintColor={rank?.color}
						thumbTintColor={rank?.color}
						value={0.3}
					/>
				</View>
			</View>
			{/* A section that contains 2 button to redeem page and home page */}
			<View className="flex flex-col justify-center bg-transparent my-1 w-full">
				<View className="flex flex-row items-center justify-center px-2">
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("Shop", {
								coins: totalCoins,
								historyJourneys: travelHistoryList,
								// coins: userData.coins,
								// historyJourneys: userData.historyJourneys,
							})
						}
						className="flex flex-row items-center justify-center bg-neutral-800 rounded-lg py-4 px-2 mx-1"
					>
						<FontAwesome5 name="store" size={20} color="#99f6e4" />
						<Text className="text-center sm:text-xs md:text-xs text-neutral-300 ml-2">
							Redeem Rewards
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("Home");
						}}
						className="flex flex-row items-center justify-center bg-neutral-800 rounded-lg py-4 px-2 mx-1"
					>
						<FontAwesome5 name="search-location" size={20} color="#99f6e4" />
						<Text className="text-center text-xs text-neutral-300 ml-2">
							Continue Travel
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Text className="text-neutral-100 self-start text-lg mt-3 mb-2 px-4">
				Travel History
			</Text>
			{/* Card showing travel history */}
			<ScrollView className="flex w-full mt-1">
				{travelHistoryList?.length > 0 ? (
					<ScrollView className="w-full px-1">
						{travelHistoryList.map((travelHistory, index) => (
							<View
								key={index}
								className="flex flex-col justify-center bg-neutral-800 rounded-sm mt-1 mb-4 w-full px-0.5"
							>
								<View className="flex flex-row items-center justify-start">
									<Text className="text-center text-[15px] text-neutral-100 my-2 ml-2">
										{travelHistory.departure} - {travelHistory.arrival}
									</Text>
								</View>
								<View className=" w-11/12 h-[1px] bg-neutral-400 self-center mb-1"></View>
								<View className="flex flex-row items-center justify-between px-2">
									<View className="flex flex-row items-center justify-center">
										<FontAwesome5
											name="calendar-alt"
											size={16}
											color="#f5f5f5"
										/>
										<Text className="text-center text-xs text-neutral-100 my-2 ml-1.5">
											{travelHistory.date}
										</Text>
									</View>
									<View className="flex flex-row items-center justify-center">
										<FontAwesome5 name="clock" size={16} color="#f5f5f5" />
										<Text className="text-center text-xs text-neutral-100 my-2 ml-1">
											{travelHistory.departureTime} -{" "}
											{travelHistory.arrivalTime}
										</Text>
									</View>
								</View>
								<View className="flex flex-row items-center justify-between px-2 py-3">
									<View className="flex flex-row items-center justify-center">
										<FontAwesome5 name="coins" size={16} color="#eab308" />
										<Text className="text-center text-sm text-neutral-100 ml-0.5">
											{travelHistory.coinsCollected} coins
										</Text>
									</View>
									<View className="flex flex-row items-center justify-center">
										<FontAwesome5 name="euro-sign" size={16} color="#f5f5f5" />
										<Text className="text-center text-sm text-neutral-100 ml-0.5">
											{travelHistory.fareInCents}
										</Text>
									</View>
									<View className="flex flex-row items-center justify-center">
										<MaterialCommunityIcons
											name="molecule-co2"
											size={24}
											color="#f5f5f5"
										/>
										<Text className="text-center text-sm text-neutral-100 ml-0.5">
											{travelHistory.Co2Emission} g/km
										</Text>
									</View>
								</View>
							</View>
						))}
					</ScrollView>
				) : (
					<View className="items-center justify-center self-center">
						<Text className="text-neutral-100 text-xs mb-3 mt-6 px-4">
							No recent journey was found
						</Text>
						{/* <FontAwesome5 name="history" size={30} color="#99f6e4" /> */}
					</View>
				)}
			</ScrollView>
		</View>
	);
}
