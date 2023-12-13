import {
	View,
	Text,
	TextInput,
	Modal,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";

import Header from "../components/Header";
//icons
import {
	Ionicons,
	Feather,
	FontAwesome5,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
//selected voice
import { useSelector } from "react-redux";

// import { apiCall } from "../api/openAI";
import { OPENAI_KEY } from "@env";
const systemPrompt =
	"You are a friendly and helpful travelling companion assistant who knows the information about the location that user want to travel. Give some recommendations and suggestions a list of different things for the corresponding location. Try to adapt with the conversation and asking the user as much as possible about their preferences.";
const chatgptUrl = "https://api.openai.com/v1/chat/completions";

export default function Home({ navigation }) {
	const welcomeVoice = useSelector((state) => state.selectedVoice.voices[0]); //voices 0 contains the voice of welcome message

	const [modalVisible, setModalVisible] = useState(false);
	//chat states
	const [messages, setMessages] = useState([
		{
			sender: "system",
			content: "Hello, I'm 9292Hoi! Your travel companion.",
		},
		{
			sender: "system",
			content: "Let's started. Where do you want to go?",
		},
	]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	// const [response, setResponse] = useState("");
	const [userInput, setUserInput] = useState("");

	//play the audio when page is loaded
	useEffect(() => {
		const sound = new Audio.Sound();
		const loadAndPlayAudio = async () => {
			try {
				await sound.loadAsync(welcomeVoice.voiceUrl);
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

	//api call
	const handleSendMessage = async () => {
		// Add user message to chat
		console.log("Sending...");
		setMessages((prevMessages) => [
			...prevMessages,
			{ content: userInput, sender: "user" },
		]);

		// const data = await apiCall(userInput);
		// console.log(data);

		// Call OpenAI API with the message
		const aiResponse = await fetch(chatgptUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${OPENAI_KEY}`,
			},
			body: JSON.stringify({
				model: "gpt-3.5-turbo",
				messages: [
					//zero shot
					{
						role: "system",
						content: systemPrompt,
					},
					{
						role: "user",
						content: userInput,
					},
				],
				max_tokens: 256,
				temperature: 0.2,
				// stop: "\n",
				n: 1,
			}),
		});

		const data = await aiResponse.json();
		console.log("getting response data", data);

		// Add AI response to chat
		setMessages((prevMessages) => [
			...prevMessages,
			// { content: data.trim(), sender: "chatbot" },
			{ content: data?.choices[0]?.message?.content.trim(), sender: "chatbot" },
		]);

		// Clear user input
		setUserInput("");
	};

	const handleClearChat = () => {
		setMessages([]);
		setUserInput("");
	};

	//load initial messages everytime modal is opened
	useEffect(() => {
		setMessages([
			{
				sender: "system",
				content: "Hello, I'm 9292Hoi! Your travel companion.",
			},
			{
				sender: "system",
				content: "Let's start discovering your journey!",
			},
		]);
	}, [modalVisible]);

	return (
		<View className="flex-1 items-center justify-center bg-neutral-900">
			<TouchableOpacity onPress={() => navigation.navigate("LocationScreen")}>
				{/* App Touchable icon which navigate to the chat screen */}
				<Ionicons
					name="navigate-circle-outline"
					style={{
						alignSelf: "center",
						// marginTop: 100
					}}
					size={180}
					color="#99f6e4"
				/>
			</TouchableOpacity>
			<Text className="text-neutral-100 font-bold text-lg text-center mt-3">
				Hoi! Let's go Travelling..
			</Text>
			<Text className="text-neutral-100 font-bold text-xs text-center mt-3 mb-12">
				Click the navigation icon and start your journey!
			</Text>
			{/* Create a floating button to navigate to the chat screen */}
			<View className="absolute bottom-6 right-6">
				<TouchableOpacity
					onPress={() => {
						setModalVisible(true);
					}}
					className="items-center justify-center w-16 h-16 bg-neutral-800 rounded-full"
				>
					<Ionicons name="chatbubbles-outline" size={32} color="#99f6e4" />
				</TouchableOpacity>
			</View>
			{/* Modal for the chat screen */}
			{modalVisible && (
				<Modal
					animationType="slide"
					duration={1000}
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View className="flex-1 flex-col bg-neutral-900 rounded-md mt-8 px-2 py-1">
						{/* Row that contains all the icons of the chat screen */}
						<View className="flex-row items-center justify-between bg-teal-600 rounded-t-md">
							<Text className="text-neutral-100 text-lg py-2 px-3">
								9292Hoi GPT
							</Text>
							<TouchableOpacity
								className="items-center justify-center w-8 h-8"
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Ionicons name="close-outline" size={24} color="#171717" />
							</TouchableOpacity>
						</View>
						{/* Chat Screen In Here */}
						<View className="flex-1 flex-col justify-center my-2">
							{/* Messages */}
							<ScrollView
								className="bg-neutral-800 flex-1 rounded-xl px-3 py-4"
								showsVerticalScrollIndicator={false}
							>
								{messages.map((message, index) => {
									return (
										<View
											key={index}
											className={`flex-1 flex-row justify-${
												message.sender === "user" ? "end" : "start"
											} my-1`}
										>
											<View
												className={`${
													message.sender === "user"
														? "bg-teal-600"
														: "bg-neutral-700"
												} rounded-lg px-2 py-3`}
											>
												<Text
													className={`text-neutral-100 text-xs ${
														message.sender === "user"
															? "text-right"
															: "text-left"
													}`}
												>
													{message.content}
												</Text>
											</View>
										</View>
									);
								})}
							</ScrollView>

							{/* User Input */}
							<View className="flex-row items-center justify-between my-2 mx-0.5 bg-neutral-800 rounded-md pr-2">
								<TouchableOpacity className="ml-2" onPress={handleClearChat}>
									<MaterialCommunityIcons
										name="broom"
										size={20}
										color="#99f6e4"
									/>
								</TouchableOpacity>
								<View className="flex-1">
									<TextInput
										className="px-2 py-3 text-neutral-100 mr-2"
										placeholder="Ask me anything..."
										placeholderTextColor={"#f5f5f5"}
										value={userInput}
										onChangeText={(text) => setUserInput(text)}
									/>
								</View>
								<View className="flex-row items-center justify-center py-2 px-0.5">
									<TouchableOpacity
										// className="flex-row items-center justify-center bg-neutral-800"
										onPress={handleSendMessage}
									>
										<Feather name="send" size={16} color="#99f6e4" />
									</TouchableOpacity>
									<TouchableOpacity
										className="ml-2.5"
										// onPress={handleSendMessage}
									>
										<FontAwesome5 name="microphone" size={16} color="#99f6e4" />
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
				</Modal>
			)}
		</View>
	);
}
