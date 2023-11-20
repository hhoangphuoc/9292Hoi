const voiceAssitantList = {
	title: "Voice Assistant",
	data: [
		{
			id: "1",
			type: "switch",
			pageNavigationName: "",
			featureName: "Enable Voice Assistant",
			featureDescription:
				"Enable voice assistant to help you navigate the app.",
		},
		{
			id: "2",
			type: "slider",
			pageNavigationName: "",
			featureName: "Custom Voice speed",
			featureDescription: "Change the speed of the voice assistant.",
		},
		{
			id: "3",
			type: "subpage",
			pageNavigationName: "CustomVoiceSettings",
			featureName: "Customise Voice",
			featureDescription:
				"Customise your assistant voice, accent, and language.",
		},
	],
};

const voiceSettingsList = {
	title: "Voice Travelling Features",
	data: [
		{
			id: "1",
			type: "switch",
			pageNavigationName: "",
			featureName: "Enable Travelling information",
			featureDescription:
				"Include realtime information about the departure, arrival location, scheduling, and navigation.",
		},
		{
			id: "2",
			type: "switch",
			pageNavigationName: "",
			featureName: "Enable Voice announcements",
			featureDescription:
				"Notifications about destination, next stop, and delays through voice announcements.",
		},
		{
			id: "3",
			type: "switch",
			pageNavigationName: "RouteScreen",
			featureName: "Enable Route information",
			featureDescription:
				"Notifications about route changes, route recommendations, and other route information.",
		},
	],
};
const gamificationList = {
	title: "Games Features",
	data: [
		{
			id: "1",
			type: "switch",
			pageNavigationName: "",
			featureName: "Coins Rewards",
			featureDescription:
				"Earn coins by travelling and use them to redeem rewards.",
		},
		{
			id: "2",
			type: "subpage",
			pageNavigationName: "Shop",
			featureName: "History",
			featureDescription: "View your travel history and coins earned.",
		},
	],
};

const rankCategories = [
	{
		name: "Bronze",
		color: "#cd7f32",
		min: 0,
		max: 20,
	},
	{
		name: "Silver",
		color: "#c0c0c0",
		min: 0,
		max: 40,
	},
	{
		name: "Gold",
		color: "#ffd700",
		min: 0,
		max: 60,
	},
	{
		name: "Platinum",
		color: "#e5e4e2",
		min: 0,
		max: 80,
	},
	{
		name: "Diamond",
		color: "#b9f2ff",
		min: 0,
		max: 100,
	},
];

export {
	voiceAssitantList,
	voiceSettingsList,
	gamificationList,
	rankCategories,
};
