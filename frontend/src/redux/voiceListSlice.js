import { voicePackages } from "../constant";

import { createSlice } from "@reduxjs/toolkit";

const voiceListSlice = createSlice({
	name: "voiceList",
	initialState: {
		voices: voicePackages,
		redeemlist: [],
	},
	reducers: {
		addToVoiceList: (state, action) => {
			state.redeemlist.push(action.payload);
		},
		removeFromVoiceList: (state, action) => {
			state.redeemlist = state.redeemlist.filter(
				(voice) => voice.id !== action.payload.id //action.payload is the voice object
			);
		},
	},
});

// export the action creator
export const { addToVoiceList, removeFromVoiceList } = voiceListSlice.actions;

// export the reducer
export default voiceListSlice.reducer;
