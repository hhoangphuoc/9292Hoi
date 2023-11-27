import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { persistStore, persistReducer } from "redux-persist";

import selectedVoiceReducer from "./selectedVoiceSlice";
import voiceListReducer from "./voiceListSlice";

const store = configureStore({
	reducer: {
		voiceList: voiceListReducer,
		selectedVoice: selectedVoiceReducer,
	},
	middleware: [thunk],
});

export { store };
