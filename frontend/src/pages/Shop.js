import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

//icons
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";

//audio player
import { Audio } from "expo-av";

//voices
import { voicePackages } from "../constant";

import { useDispatch, useSelector } from "react-redux";
import { addToVoiceList, removeFromVoiceList } from "../redux/voiceListSlice";

export default function Shop({ route, navigation }) {
	const { coins, historyJourneys } = route.params;

	const [userCoins, setUserCoins] = useState(coins);
	// const [redeemHistory, setRedeemHistory] = useState([]);
	const [sound, setSound] = useState();

	const dispatch = useDispatch();
	const voiceList = useSelector((state) => state.voiceList.voices); //get the voiceList from redux store if it exist
	const redeemList = useSelector((state) => state.voiceList.redeemlist); //list of voice that user redeemed

	//add and remove voice function
	const handleAddVoice = (item) => {
		dispatch(addToVoiceList(item));
	};
	const handleRemoveVoice = (item) => {
		dispatch(removeFromVoiceList(item));
	};

	// const [rewardList, setRewardList] = useState([rewardOptions]);

	//function that reduce the coins when user press redeem button
	const handleRedeem = (item) => {
		if (userCoins >= item.coins) {
			setUserCoins(userCoins - item.coins);

			// //add the item to the redeem history
			// setRedeemHistory([...redeemHistory, item]);
			handleAddVoice(item);
			console.log("redeemed a voice", item);
		} else {
			alert("You don't have enough coins to redeem this item");
		}
	};

	//function that play the audio when user press play button
	const handlePlay = async (item) => {
		console.log("Loading Sound");
		const { sound } = await Audio.Sound.createAsync(item.voiceDemo);
		setSound(sound);

		console.log("Playing Sound");
		await sound.playAsync();
	};

	//function that stop the audio when user press stop button

	//dynamically change the coins when user press redeem button
	useEffect(() => {
		setUserCoins(userCoins);
		// setRewardList(rewardList);
		// setRedeemHistory(redeemHistory);
	}, [userCoins, redeemList]);

	return (
		<View className="flex-1 pt-20">
			<View className="flex-1 flex-col bg-neutral-900 pt-2">
				<View className="flex flex-row items-center justify-end px-6 py-2">
					<Text className="text-center text-xl text-neutral-100 mr-2">
						{userCoins}
					</Text>
					<FontAwesome5 name="coins" size={30} color="#eab308" />
				</View>
				{/* List of voice options that user can redeem */}
				<ScrollView className="flex flex-col px-4">
					<Text className="text-neutral-100 font-bold text-lg text-left mt-2 mb-1">
						Redeem Options
					</Text>
					<View className="w-full h-[1px] bg-neutral-400 pl-6 mb-2"></View>

					{/* Redeem Rewards Section */}
					{voiceList.length > 0 ? (
						voiceList.map((item, index) => (
							<View
								key={index}
								className="flex-col items-start justify-between bg-neutral-800 rounded-lg px-2 my-1 mr-2 py-1"
							>
								<View className="flex flex-col px-2 pb-1 w-full">
									<View className="flex flex-row justify-between">
										<Text className="text-center text-base text-neutral-100 my-2">
											{item.name}
										</Text>
										<TouchableOpacity
											onPress={() => {
												console.log("Play button pressed");
												handlePlay(item); //play the voice demo audio of chosen voice
											}}
											className="items-center justify-center rounded-lg px-2 py-1"
										>
											<MaterialIcons
												name="record-voice-over"
												size={24}
												color="#99f6e4"
											/>
										</TouchableOpacity>
									</View>
									<Text
										className=" italic text-xs text-neutral-100 mb-3"
										numberOfLines={2}
										ellipsizeMode="tail"
									>
										{item.description}
									</Text>
								</View>
								<View className="flex flex-row justify-between w-full px-2 pb-2">
									<View className="flex flex-row items-center justify-center rounded-lg px-2 py-1">
										<Text className="text-center text-base text-neutral-100 mr-2">
											{item.coins}
										</Text>
										<FontAwesome5 name="coins" size={20} color="#eab308" />
									</View>
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
						))
					) : (
						<Text className="text-center text-base text-neutral-100 my-2">
							Nothing else to redeem rewards
						</Text>
					)}
				</ScrollView>
				{/* List of Redeemed Voice that userhave */}
				<ScrollView className="flex flex-col pt-2 pb-2 px-4">
					<Text className="text-neutral-100 font-bold text-lg text-left mt-2 pt-3 mb-1">
						Redeem History
					</Text>
					<View className="w-full h-[1px] bg-neutral-400 pl-6"></View>

					{/* Redeem History Section */}
					{redeemList.length > 0 ? (
						redeemList.map((item, index) => (
							<View
								key={index}
								className="flex-col items-start justify-between bg-neutral-800 rounded-lg px-2 my-1 mr-2"
							>
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
						))
					) : (
						<Text className="text-center text-sm text-neutral-100  items-center my-6">
							You have not redeemed any rewards
						</Text>
					)}
				</ScrollView>
				{/* Navigate to custom voice screen*/}
				<TouchableOpacity
					className="flex flex-row items-center bg-neutral-800 justify-center w-full rounded-md py-2 px-4 mt-6"
					onPress={() => navigation.navigate("CustomVoiceSettings")}
				>
					<Text className="text-neutral-100 text-base mr-2">
						Set your voice assistant
					</Text>
					<MaterialIcons name="multitrack-audio" size={16} color="#f5f5f5" />
				</TouchableOpacity>
			</View>
		</View>
	);
}
