const voicePackages = [
	{
		id: 1,
		name: "British Female Voice",
		description: "British accent, female voice, normal speed",
		voiceDemo: require("../data/audio/welcome_F_1.mp3"),
		coins: 50,
		voices: [
			{
				context: "welcome",
				script: "Welcome to the 9292 Hoi",
				voiceUrl: require("../data/audio/welcome_F_1.mp3"),
			},
			{
				context: "findLocation",
				script: "Where do you want to go?",
				voiceUrl: require("../data/audio/findLocation_F.mp3"),
			},
			{
				context: "findRoute",
				script: "Welcome to the 9292 Hoi",
				voiceUrl: require("../data/audio/findRoute_F.mp3"),
			},
			{
				context: "earnCoins",
				script: "Congratulations! You have earned... coins",
				voiceUrl: require("../data/audio/earnCoins_F.mp3"),
			},
			{
				context: "rightTrain",
				script: "You are on the right train!",
				voiceUrl: require("../data/audio/rightTrain_F.mp3"),
			},
			{
				context: "goodBye",
				script: "See you next time!",
				voiceUrl: require("../data/audio/farewell_F.mp3"),
			},
		],
	},
	{
		id: 2,
		name: "Indian Female Voice",
		description: "Indian accent, female voice, slower speed",
		voiceDemo: require("../data/audio/welcome_F_2.mp3"),
		coins: 60,
		voices: [
			{
				context: "welcome",
				script: "Welcome to the 9292 Hoi",
				voiceUrl: require("../data/audio/welcome_F_2.mp3"),
			},
		],
	},
	{
		id: 3,
		name: "Australian Male Voice",
		description: "Australian accent, male voice, normal speed",
		voiceDemo: require("../data/audio/welcome_M_1.mp3"),
		coins: 120,
		voices: [
			{
				context: "welcome",
				script: "Welcome to the 9292 Hoi",
				voiceUrl: require("../data/audio/welcome_M_1.mp3"),
			},
			{
				context: "findLocation",
				script: "Where do you want to go?",
				voiceUrl: require("../data/audio/findLocation_M.mp3"),
			},
			{
				context: "findRoute",
				script: "Welcome to the 9292 Hoi",
				voiceUrl: require("../data/audio/findRoute_M.mp3"),
			},
			{
				context: "earnCoins",
				script: "Congratulations! You have earned... coins",
				voiceUrl: require("../data/audio/earnCoins_M.mp3"),
			},
			{
				context: "rightTrain",
				script: "You are on the right train!",
				voiceUrl: require("../data/audio/rightTrain_M.mp3"),
			},
			{
				context: "goodBye",
				script: "See you next time!",
				voiceUrl: require("../data/audio/farewell_M.mp3"),
			},
		],
	},
	{
		id: 4,
		name: "British Male Voice",
		description: "British Accent, male voice, slower speed",
		voiceDemo: require("../data/audio/welcome_M_2.mp3"),
		coins: 100,
		voices: [
			{
				context: "welcome",
				script: "Welcome to the 9292 Hoi",
				voiceUrl: require("../data/audio/welcome_M_2.mp3"),
			},
		],
	},
];

export { voicePackages };
