import {
	View,
	Text,
	TextInput,
	Modal,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
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

import {
	Bubble,
	GiftedChat,
	InputToolbar,
	Send,
} from "react-native-gifted-chat";

const systemPrompt =
	"You are a friendly and helpful travelling companion assistant. You are helping a traveller to find a place to travel based on their interests and questions through a conversation with them";
const chatgptUrl = "https://api.openai.com/v1/chat/completions";

const CHAT_BOT_FACE = require("../../assets/icon.png");
export default function Home({ navigation }) {
	const welcomeVoice = useSelector((state) => state.selectedVoice.voices[0]); //voices 0 contains the voice of welcome message

	const [modalVisible, setModalVisible] = useState(false);
	//chat states
	const [messages, setMessages] = useState([]);
	const [messageLoading, setMessageLoading] = useState(false);
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

	//load initial messages everytime modal is opened
	useEffect(() => {
		setMessages([
			// {
			// 	role: "assistant",
			// 	content:
			// 		"Hoi! I'm your travel assistant. Please tell me first, where do you want to go?",
			// },
			{
				_id: 1,
				text: "Hoi! I'm your travel assistant. Please tell me first, where do you want to go?",
				createdAt: new Date(),
				user: {
					_id: 2,
					name: "9292",
					avatar: CHAT_BOT_FACE,
				},
			},
		]);
	}, [modalVisible]);

	// const handleSendMessage = async () => {
	// 	console.log("Sending...");
	// 	setMessages((prevMessages) => [
	// 		...prevMessages,
	// 		{ content: userInput, role: "user" },
	// 	]);
	// 	// Call OpenAI API
	// 	getGPTResponse(userInput);
	// 	// Clear user input
	// 	setUserInput("");
	// };

	const handleSend = useCallback((messages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
		if (messages[0].text) {
			// Call OpenAI API
			getGPTResponse(messages[0].text);
		}
	}, []);

	const getGPTResponse = async (userInput) => {
		setMessageLoading(true);
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
				max_tokens: 512,
				temperature: 0.5,
				stop: "\n",
				// n: 1,
			}),
		});

		const data = await aiResponse
			.json()
			.then((data) => {
				if (data?.choices[0]?.message?.content) {
					setMessageLoading(false);

					const chatAIResp = {
						_id: Math.random() * (9999999 - 1),
						text: data?.choices[0]?.message?.content,
						createdAt: new Date(),
						user: {
							_id: 2,
							name: "9292",
							avatar: CHAT_BOT_FACE,
						},
					};
					setMessages((previousMessages) =>
						GiftedChat.append(previousMessages, chatAIResp)
					);

					// setMessages((prevMessages) => [
					// 	...prevMessages,
					// 	{
					// 		content: data?.choices[0]?.message?.content.trim(),
					// 		role: "assistant",
					// 	},
					// ]);
				} else {
					setMessageLoading(false);
					const chatAIResp = {
						_id: Math.random() * (9999999 - 1),
						text: "Sorry, I don't understand. Please try again.",
						createdAt: new Date(),
						user: {
							_id: 2,
							name: "9292",
							avatar: CHAT_BOT_FACE,
						},
					};
					setMessages((previousMessages) =>
						GiftedChat.append(previousMessages, chatAIResp)
					);
					// setMessages((prevMessages) => [
					// 	...prevMessages,
					// 	{
					// 		content: "Sorry, I don't understand. Please try again.",
					// 		role: "assistant",
					// 	},
					// ]);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleClearChat = () => {
		setMessages([]);
		setUserInput("");
	};

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
			<View className="absolute bottom-6 right-6 flex-row justify-end">
				<Text className="text-neutral-100 opacity-70 text-xs text-center mr-2 ml-1 self-center">
					Find where to go? Ask our 9292bot!
				</Text>
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
							<Text className="text-neutral-200 text-lg py-2 px-3">
								9292Hoi GPT
							</Text>
							<TouchableOpacity
								className="items-center justify-center w-8 h-8"
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Ionicons name="close-outline" size={30} color="#d4d4d4" />
							</TouchableOpacity>
						</View>
						{/* Chat Screen In Here */}
						<View className="flex-1 justify-center my-2">
							<GiftedChat
								messages={messages}
								isTyping={messageLoading}
								onSend={(messages) => handleSend(messages)}
								user={{
									_id: 1,
								}}
								scrollToBottom={true}
								placeholder="Discover locations, places,..."
								showUserAvatar={true}
								showAvatarForEveryMessage={true}
								renderAvatarOnTop={true}
								renderInputToolbar={(props) => {
									return (
										<InputToolbar
											{...props}
											containerStyle={{
												backgroundColor: "#171717",
												borderTopWidth: 0,
											}}
											placeholderTextColor={"#f5f5f5"}
											textInputStyle={{
												color: "#f5f5f5",
											}}
											primaryStyle={{ alignItems: "center" }}
										/>
									);
								}}
								renderSend={(props) => {
									return (
										<Send {...props}>
											<View
												style={{
													marginRight: 10,
													marginBottom: 5,
												}}
											>
												{/* <FontAwesome5
												name="paper-plane"
												size={24}
												color="#99f6e4"
											/> */}
												<Feather name="send" size={20} color="#99f6e4" />
											</View>
										</Send>
									);
								}}
								renderBubble={(props) => {
									return (
										<Bubble
											{...props}
											wrapperStyle={{
												right: {
													backgroundColor: "#0d9488",
												},
												left: {
													backgroundColor: "#262626",
												},
											}}
											textStyle={{
												right: {
													color: "#f5f5f5",
												},
												left: {
													color: "#f5f5f5",
												},
											}}
										/>
									);
								}}
							/>

							{/* Messages */}
							{/* <ScrollView
								className="bg-neutral-800 flex-1 rounded-xl px-3 py-4"
								showsVerticalScrollIndicator={false}
							>
								{messages.map((message, index) => {
									return (
										<View
											key={index}
											className={`flex-1 flex-row justify-${
												message.role === "user" ? "end" : "start"
											} my-1`}
										>
											<View
												className={`${
													message.role === "user"
														? "bg-teal-600"
														: "bg-neutral-700"
												} rounded-lg px-2 py-3`}
											>
												<Text
													className={`text-neutral-100 text-xs ${
														message.role === "user" ? "text-right" : "text-left"
													}`}
												>
													{messageLoading && message.role === "assistant"
														? "Generating response..."
														: message.content}
													{/* {message.content} */}
							{/* </Text>
											</View>
										</View> */}
							{/* );
								})}
							</ScrollView> */}

							{/* User Input */}
							{/* <View className="flex-row items-center justify-between my-2 mx-0.5 bg-neutral-800 rounded-md pr-2">
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
										placeholder="Discover locations, places,..."
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
										<Feather name="send" size={20} color="#99f6e4" />
									</TouchableOpacity>
								</View>
							</View> */}
						</View>
					</View>
				</Modal>
			)}
		</View>
	);
}
