const SWITCH_VOICE = "SWITCH_VOICE";

import { voicePackages } from "../constant";

import { createSlice } from "@reduxjs/toolkit";

const selectedVoiceSlice = createSlice({
	name: "selectedVoice",
	initialState: voicePackages[0],
	reducers: {
		switchVoice: (state, action) => action.payload, //payload is the voice
	},
});

// export the action creator
export const { switchVoice } = selectedVoiceSlice.actions;

// export the reducer
export default selectedVoiceSlice.reducer;
