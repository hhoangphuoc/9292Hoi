import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import SideMenu from "./src/navigation/SideMenu";

// import {SideMenu, MainLayout, VoiceSettingsLayout } from './src/navigation';
// import MainLayout from "./src/navigation/MainLayout";
export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style="auto" />
			<SideMenu />
		</NavigationContainer>
	);
}
