import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import LottieView from "lottie-react-native";
import {
	Ionicons,
	AntDesign,
	FontAwesome5,
	MaterialIcons,
} from "@expo/vector-icons";

import { Audio } from "expo-av";

//function
import { formatJourney } from "../constant/helperFunctions";
//progress bar
import * as Progress from "react-native-progress";

import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

//components
import JourneyInfo from "../components/JourneyInfo";
// Header - TODO: change to component
const Header = ({ navigation, fromName, toName }) => {
	return (
		<View
			className="flex flex-row items-center justify-center self-center mt-12 pt-4 pb-2 px-4 ml-1"
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

	const otherStackNavigation = useNavigation();

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
				<Text className="text-neutral-100 text-xs ml-1 mb-2">{"."}</Text>
			</View>
		);
	});

	const legs = formattedJourney?.legs;
	const coins = formattedJourney?.coins;
	const duration = formattedJourney?.duration;

	//voices
	const journeySummaryVoice = useSelector(
		(state) => state.selectedVoice.voices[5]
	); //voice 5 is the summary of journey detail (duration + coins)
	const congratsVoice = useSelector((state) => state.selectedVoice.voices[6]); //voices 6 is the congrats message

	const [sound, setSound] = useState();
	//play the confetti when the user finish the journey
	const [progress, setProgress] = useState(0);
	const [finished, setFinished] = useState(false);
	const confettiLottieRef = useRef(null);

	useEffect(() => {}, [progress, finished]);

	function triggerConfetti() {
		confettiLottieRef.current?.play(0);
	}

	async function triggerSound(soundUrl) {
		console.log("Loading Sound");
		const { sound } = await Audio.Sound.createAsync(soundUrl);
		setSound(sound);

		console.log("Playing Sound");
		await sound.playAsync();
	}

	//play sound when the page is loaded
	useEffect(() => {
		triggerSound(journeySummaryVoice.voiceUrl);
	}, []);

	//play sound when finished
	useEffect(() => {
		if (progress / coins >= 1) {
			triggerSound(congratsVoice.voiceUrl);
		}
		// return () => {
		// 	sound.unloadAsync(); // Unload the sound when the component unmounts
		// };
	}, [progress, coins]);

	return (
		<View className="flex-1 items-start justify-center bg-neutral-900 pt-8">
			<Header navigation={navigation} fromName={fromName} toName={toName} />
			<View className="w-1/2 self-center h-[1px] bg-neutral-400 my-2" />

			{/* General Journey Info Section */}
			<View className="flex flex-row bg-neutral-800 mt-2 items-center self-center rounded-md">
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
							<Text className="text-neutral-100 text-xs ml-1">
								{formattedJourney?.durationStr}
							</Text>
						</View>
						<View className="flex flex-row items-center justify-center py-1 px-2 ml-1">
							<FontAwesome5 name="euro-sign" size={14} color="#f5f5f5" />
							<Text className="text-neutral-100 text-xs ml-1">
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
			<View className="flex flex-row pt-4 px-4 items-center justify-between w-full">
				<Text className="text-neutral-100 text-lg text-left">
					Journey Details
				</Text>
				<TouchableOpacity
					className="flex flex-row items-center justify-center py-1 px-2"
					onPress={() => {
						// handleStop(sound, setSound);
						navigation.navigate("Home");
						setProgress(0);
						setFinished(false);
						confettiLottieRef.current?.reset();
					}}
				>
					<Ionicons name="close" size={20} color="#f87171" />
					<Text className="text-red-400 text-sm underline mb-0.5">Cancel</Text>
				</TouchableOpacity>
			</View>

			<View className="w-full h-[1px] bg-neutral-600 my-2 mx-3" />
			<Text
				className="text-neutral-400 text-xs text-center self-center mx-4"
				// style={{ lineHeight: 20 }}
			>
				"Don't forget to
				<Text className="text-amber-400"> collect your coins</Text> whenever you
				complete a route of the journey!" ^^
			</Text>
			<JourneyInfo
				legs={legs}
				coins={coins}
				totalDuration={duration}
				setProgress={setProgress}
			/>
			{progress / coins >= 1 ? (
				<TouchableOpacity
					// onPress={setFinished(true)}
					className="flex flex-col bg-neutral-800 justify-center w-full rounded-md py-5 px-2"
					onPress={() => {
						triggerConfetti();
						triggerSound();
					}}
				>
					<Text className="text-green-400 text-center text-base ml-2 mr-2">
						From this journey, you earned
					</Text>

					<View className="flex flex-row items-center justify-center pl-2 mt-2.5">
						<FontAwesome5 name="coins" size={24} color="#eab308" />
						<Text
							className="text-amber-400 text-center text-lg mx-2 "
							style={{ fontWeight: "bold" }}
						>
							{coins} coins
						</Text>
					</View>
					<Text className="text-neutral-100 opacity-30 text-center text-sm top-1/3 mx-2">
						Congratulation! Press again to celebrate
					</Text>
					<LottieView
						ref={confettiLottieRef}
						autoPlay
						loop={false}
						style={{
							width: "100%",
							height: 250,
							alignSelf: "center",
						}}
						source={require("../data/animation/confetti.json")}
					/>
					<View className="flex flex-row items-center justify-center mx-2">
						<TouchableOpacity
							className="flex flex-row items-center justify-center bg-neutral-700 rounded-md py-1 px-2 mx-2 z-20"
							onPress={() => {
								// handleStop(sound, setSound);
								navigation.navigate("Home");
							}}
						>
							{/* <AntDesign name="rightcircleo" size={20} color="#f5f5f5" /> */}
							<FontAwesome5 name="door-open" size={20} color="#f5f5f5" />
							<Text className="text-neutral-100 text-sm ml-1.5 my-0.5">
								Return Home
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							className="flex flex-row items-center justify-center bg-neutral-700 rounded-md py-1 px-2 mx-2 z-20"
							onPress={() => {
								// handleStop(sound, setSound);

								//navigate to the profile screen in the other stack
								otherStackNavigation.navigate("User Profile");
							}}
						>
							<FontAwesome5 name="user-circle" size={24} color="#f5f5f5" />
							<Text className="text-neutral-100 text-sm ml-1.5 my-0.5">
								Your Profile
							</Text>
						</TouchableOpacity>
					</View>
					{/* {finished && triggerConfetti() ( */}

					{/* )} */}
				</TouchableOpacity>
			) : (
				<View className="flex flex-row items-center bg-neutral-800 justify-center w-full rounded-md py-4 px-2">
					<Progress.Bar
						progress={progress / coins}
						width={260}
						height={20}
						color="#99f6e4"
						borderColor="#f5f5f5"
						borderWidth={1}
						borderRadius={8}
					/>
					<Text className="text-neutral-100 text-sm ml-2 mr-1">
						{Math.floor((progress / coins) * 100)}%
					</Text>
					<FontAwesome5 name="flag-checkered" size={24} color="#99f6e4" />
				</View>
			)}
		</View>
	);
}
