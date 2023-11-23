import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import SideMenu from "./src/navigation/SideMenu";

//redux
import { Provider } from "react-redux";

//using Redux Store to store the state such as voice selection, route history, etc.
import { store } from "./src/redux/store";

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<StatusBar style="auto" />
				<SideMenu />
			</NavigationContainer>
		</Provider>
	);
}
