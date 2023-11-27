import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";

//handling state change in Redux
import { useDispatch, useSelector } from "react-redux";

//function that switch between voices
import { switchVoice } from "../redux/selectedVoiceSlice";
//voice packages
import { voicePackages } from "../constant/voice";

//icon
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function CustomVoiceSettings({ navigation }) {
	//handling state change in Redux
	const dispatch = useDispatch();
	const voiceList = useSelector((state) => state.voiceList.redeemlist); //get the voiceList from redux store if it exist
	const selectedVoice = useSelector((state) => state.selectedVoice); //get the selectedVoice from redux store if it exist

	return (
		<View className=" flex-1 bg-neutral-900 pt-20">
			<Text className="text-neutral-100 font-bold text-lg text-center mt-8 mb-2">
				Custom Voice Settings
			</Text>
			<View className="w-2/3 h-[1px] self-center bg-neutral-400 pl-6 mb-2"></View>
			{/* List of redeemed voices that can be selected, the list take from voice list */}
			{voiceList.length === 0 ? (
				<View className="flex flex-col items-center justify-center bg-neutral-900 mt-3 mx-3">
					<Text className="text-neutral-100 font-bold text-lg text-center">
						You have not redeemed any voice yet.
					</Text>
				</View>
			) : (
				<View className="flex flex-col items-center justify-center bg-neutral-900 mt-3 mx-3">
					<Text className="text-neutral-100 text-sm font-light text-center my-3 px-2">
						"This is the list of voice you have redeemed, please select one for
						the voice companion that you want!"
					</Text>
					{voiceList.map((voice, index) => (
						<View
							key={index}
							className="flex flex-row items-center justify-center px-2 py-1 my-1 bg-neutral-900"
						>
							<TouchableOpacity
								key={index}
								// key={index}
								className="flex flex-row items-center justify-between bg-neutral-800 rounded-sm px-2 py-3 w-full"
								onPress={() => dispatch(switchVoice(voice))} //switch the voice when user select this option
							>
								{/* Display the voice name */}
								<Text
									className="text-neutral-100 text-base mx-3"
									numberOfLines={2}
									ellipsizeMode="tail"
								>
									{voice.name}
								</Text>
								{/* Display the check mark*/}
								{voice.name === selectedVoice.name ? (
									<Ionicons name="checkmark-circle" size={22} color="#99f6e4" />
								) : (
									// <Ionicons name="checkmark-circle" size={22} color="#1f2937" />
									<MaterialIcons
										name="radio-button-unchecked"
										size={24}
										color="black"
									/>
								)}
							</TouchableOpacity>
						</View>
					))}
				</View>
			)}
			<Text className="text-neutral-100 text-sm font-light text-center mt-6 px-2">
				Ready to go? Let's go travelling
			</Text>
			<TouchableOpacity
				className="flex flex-row items-center justify-center bg-teal-400 rounded-sm mt-2 py-1 px-1"
				onPress={() => navigation.navigate("Home")}
			>
				{/* <MaterialIcons name="add-shopping-cart" size={20} color="black" /> */}
				<Ionicons name="navigate-circle" size={20} color="black" />
				<Text className="text-neutral-900 text-lg text-center ml-2">
					Go back to Home
				</Text>
			</TouchableOpacity>
		</View>
	);
}
