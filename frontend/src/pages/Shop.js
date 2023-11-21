import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

//icons
import { FontAwesome5 } from "@expo/vector-icons";
const rewardOptions = [
	{
		name: "Voice 1",
		description: "British accent, female voice, normal speed",
		voice: "",
		coins: 20,
	},
	{
		name: "Voice 2",
		description: "with the American accent, male voice.",
		voice: "",
		coins: 50,
	},
	{
		name: "Voice 3",
		description: "with special cartoon character.",
		voice: "",
		coins: 100,
	},
];

export default function Shop({ route, navigation }) {
	const { coins, historyJourneys } = route.params;

	const [userCoins, setUserCoins] = useState(coins);
	const [redeemHistory, setRedeemHistory] = useState([]);
	// const [rewardList, setRewardList] = useState([rewardOptions]);

	//function that reduce the coins when user press redeem button
	const handleRedeem = (item) => {
		if (userCoins >= item.coins) {
			setUserCoins(userCoins - item.coins);

			//add the item to the redeem history
			setRedeemHistory([...redeemHistory, item]);

			console.log("voice List", redeemHistory);
		} else {
			alert("You don't have enough coins to redeem this item");
		}
	};

	//dynamically change the coins when user press redeem button
	useEffect(() => {
		setUserCoins(userCoins);
		// setRewardList(rewardList);
		setRedeemHistory(redeemHistory);
	}, [userCoins, redeemHistory]);

	return (
		<View className="flex-1 pt-20">
			<View className="flex-1 flex-col bg-neutral-900 py-4">
				<View className="flex flex-row items-center justify-end px-6 py-2">
					<Text className="text-center text-xl text-neutral-100 mr-2">
						{userCoins}
					</Text>
					<FontAwesome5 name="coins" size={30} color="#eab308" />
				</View>
				<View className="flex flex-col pt-6 pb-2 px-4">
					<Text className="text-neutral-100 font-bold text-lg text-left mt-3 mb-1">
						Redeem Options
					</Text>
					<View className="w-full h-[1px] bg-neutral-400 pl-6 mb-2"></View>

					{/* Redeem Rewards Section */}
					{rewardOptions.length > 0 ? (
						<FlatList
							horizontal={true}
							data={rewardOptions}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => (
								<View className="flex-col items-start justify-between bg-neutral-800 rounded-lg px-2 my-1 mr-2">
									<View className="flex flex-col px-2 pb-1 w-full">
										<View className="flex flex-row justify-between">
											<Text className="text-center text-base text-neutral-100 my-2">
												{item.name}
											</Text>
											<View className="flex flex-row items-center justify-center rounded-lg px-2 py-1">
												<Text className="text-center text-base text-neutral-100 mr-2">
													{item.coins}
												</Text>
												<FontAwesome5 name="coins" size={20} color="#eab308" />
											</View>
										</View>
										<Text
											className=" italic text-xs text-neutral-100 mb-3"
											numberOfLines={2}
											ellipsizeMode="tail"
										>
											{item.description}
										</Text>
									</View>
									<View className="flex items-end justify-end w-full px-2 pb-2">
										<TouchableOpacity
											onPress={() => {
												console.log("Redeem button pressed");
												handleRedeem(item);
											}}
											className="items-center justify-center bg-teal-300 rounded-lg py-1 px-2"
										>
											<Text className="text-center text-sm text-neutral-900">
												Redeem
											</Text>
										</TouchableOpacity>
									</View>
								</View>
							)}
						/>
					) : (
						<Text className="text-center text-base text-neutral-100 my-2">
							Nothing else to redeem rewards
						</Text>
					)}
				</View>

				<View className="flex flex-col pt-6 pb-2 px-4">
					<Text className="text-neutral-100 font-bold text-lg text-left mt-3 mb-1">
						Redeem History
					</Text>
					<View className="w-full h-[1px] bg-neutral-400 pl-6"></View>

					{/* Redeem History Section */}
					{redeemHistory.length > 0 ? (
						<FlatList
							data={redeemHistory}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => (
								<View className="flex-col items-start justify-between bg-neutral-800 rounded-lg px-2 my-1 mr-2">
									<View className="flex flex-col px-2 pb-1 w-full">
										<View className="flex flex-row justify-between">
											<Text className="text-center text-base text-neutral-100 my-2">
												{item.name}
											</Text>
											<View className="flex flex-row items-center justify-center rounded-lg px-2 py-1">
												<Text className="text-center text-base text-neutral-100 mr-2">
													{item.coins}
												</Text>
												<FontAwesome5 name="coins" size={20} color="#eab308" />
											</View>
										</View>
									</View>
								</View>
							)}
						/>
					) : (
						<Text className="text-center text-sm text-neutral-100  items-center my-6">
							You have not redeemed any rewards
						</Text>
					)}
				</View>
			</View>
		</View>
	);
}
