import { View, Text } from "react-native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
// import {createNativeS}
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LocationScreen, RouteScreen, TravelDetails } from "../pages";
import SideMenu from "./SideMenu";

const MainStack = createStackNavigator();
// const MainStack = createNativeStackNavigator();

export default function MainLayout() {
	return (
		<MainStack.Navigator
			// headerMode="none"
			//hide the header from the main screen
			screenOptions={{
				headerShown: false,
			}}
		>
			<MainStack.Screen name="Menu" component={SideMenu} />
			<MainStack.Screen name="LocationScreen" component={LocationScreen} />
			<MainStack.Screen name="RouteScreen" component={RouteScreen} />
			<MainStack.Screen name="Travel Details" component={TravelDetails} />
		</MainStack.Navigator>
	);
}
