/**
 * Voice packages
 * @typedef {Object} VoicePackage
 * @property {number} id - The id of the voice package
 * @property {string} name - The name of the voice package
 * @property {string} description - The description of the voice package
 * @property {any} voiceDemo - The voice demo of the voice package (this is the welcome voice)
 * @property {number} coins - The coins required to redeem the voice package
 * @property {Array.<Voice>} voices - The voices of the voice package
 * @property {number} voices[].context - The context of the voice (welcome, findLocation, findRoute, earnCoins, rightTrain, goodBye)
 * @property {string} voices[].script - The script of the voice (what the voice will say?)
 * @property {any} voices[].voiceUrl - The url of the voice which link with the audio files
 */

/**
 * Voice Layout:
 * voice [0]: Welcome message
 * voice [1]: Find location message - Show when user enter the location page
 * voice [2]: Find route message - Show when user enter the route page
 * voice [3]: Earn coins message - Show when user earn coins (after complete the route - NOT IMPLEMENTED YET)
 * voice [4]: Right train message - Show when user enter the right train (NOT IMPLEMENTED YET)
 * voice [5]: Goodbye message - Show when user exit the app
 */

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
				script: "Let me find the route for you",
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
