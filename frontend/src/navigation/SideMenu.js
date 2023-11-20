import React from "react";
import { Text } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
// import { CustomVoiceSettings, Shop, Profile } from "../pages";
// import { useNavigation } from '@react-navigation/native';
import Header from "../components/Header";
import {
	Home,
	Profile,
	Shop,
	CustomVoiceSettings,
	LocationScreen,
	RouteScreen,
	TravelDetails,
	VoiceSettings,
} from "../pages";
// import VoiceSettingsLayout from "./VoiceSettingsLayout";
// import ProfileLayout from "./ProfileLayout";
// import VoiceSettingsLayout from "./VoiceSettingsLayout";
//icons
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();
const DrawerItems = [
	{
		name: "9292 Hoi",
		iconName: "home-outline",
	},
	{
		name: "User Profile",
		iconName: "person-circle-outline",
	},
	{
		name: "Departure",
		iconName: "time-outline",
	},
	{
		name: "My Travel Advice",
		iconName: "calendar-outline",
	},
	{
		name: "Voice Settings",
		iconName: "settings-outline",
	},
];

const ProfileStack = createStackNavigator();
const MainStack = createStackNavigator();
const VoiceStack = createStackNavigator();
// const MainStack = createNativeStackNavigator();

const MainLayout = () => {
	return (
		<MainStack.Navigator
			// headerMode="none"
			//hide the header from the main screen
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="Home"
		>
			{/* <MainStack.Screen name="Menu" component={SideMenu} /> */}
			<MainStack.Screen name="Home" component={Home} />
			<MainStack.Screen name="LocationScreen" component={LocationScreen} />
			<MainStack.Screen name="RouteScreen" component={RouteScreen} />
			<MainStack.Screen name="Travel Details" component={TravelDetails} />
		</MainStack.Navigator>
	);
};

const ProfileLayout = () => {
	return (
		<ProfileStack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="Profile"
		>
			<ProfileStack.Screen name="Profile" component={Profile} />
			<ProfileStack.Screen name="Shop" component={Shop} />
			<ProfileStack.Screen
				name="CustomVoiceSettings"
				component={CustomVoiceSettings}
			/>
		</ProfileStack.Navigator>
	);
};

const VoiceLayout = () => {
	return (
		<VoiceStack.Navigator
			initialRouteName="Voice Settings"
			screenOptions={{
				headerShown: false,
			}}
		>
			<VoiceStack.Screen name="Voice Settings" component={VoiceSettings} />
			<VoiceStack.Screen
				name="CustomVoiceSettings"
				component={CustomVoiceSettings}
			/>
			<VoiceStack.Screen name="Shop" component={Shop} />
		</VoiceStack.Navigator>
	);
};

export default function SideMenu() {
	return (
		<Drawer.Navigator
			initialRouteName="Home"
			screenOptions={{
				drawerType: "slide",
				overlayColor: "transparent",
				drawerStyle: {
					flex: 1,
					width: "85%",
					paddingRight: 20,
					backgroundColor: "#262626",
				},
				sceneContainerStyle: {
					backgroundColor: "##262626",
				},
			}}
		>
			{DrawerItems.map((sideMenuItem, index) => {
				return (
					<Drawer.Screen
						key={index}
						name={sideMenuItem.name}
						component={
							sideMenuItem.name === "9292 Hoi"
								? MainLayout
								: sideMenuItem.name === "User Profile"
								? ProfileLayout
								: sideMenuItem.name === "Voice Settings"
								? VoiceLayout
								: Home
						}
						options={{
							drawerIcon: ({ focused }) => (
								<Ionicons
									name={sideMenuItem.iconName}
									size={24}
									color={focused ? "#5eead4" : "#f5f5f5"}
								/>
							),
							drawerLabel: ({ focused }) => (
								<Text
									style={{
										color: focused ? "#5eead4" : "#f5f5f5",
										fontSize: 15,
										fontWeight: focused ? "bold" : "normal",
									}}
								>
									{sideMenuItem.name}
								</Text>
							),
							headerShown: true,
							header: ({ navigation }) => (
								<Header navigation={navigation} screen={sideMenuItem.name} />
							),
						}}
					/>
				);
			})}
		</Drawer.Navigator>
	);
}
