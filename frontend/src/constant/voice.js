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
		name: "American English (Beth)",
		description: "American accent, female voice, normal speed",
		voiceDemo: require("../data/audio/American_English_Beth/beth_en_us_01.mp3"),
		coins: 50,
		voices: [
			{
				context: "welcome",
				script: "Hoi! Let's go travelling",
				voiceUrl: require("../data/audio/American_English_Beth/beth_en_us_01.mp3"),
			},
			{
				context: "findLocation",
				script: "I'm here to help! Where can I guide you today?",
				voiceUrl: require("../data/audio/American_English_Beth/beth_en_us_02.mp3"),
			},
			{
				context: "travelTips",
				script:
					"Travel tips: Enjoy Rotterdam's iconic landmarks, such as Keulen Tower and Markt hal Building on your way to Rotterdam Centraal Station.",
				voiceUrl: require("../data/audio/American_English_Beth/beth_en_us_03.mp3"),
			},
			{
				context: "shoppingTips",
				script:
					"Shopping tips: Stop at the shopping area in the center of Rotterdam. Experience fashionable boutiques and local cuisine before continuing your journey.",
				voiceUrl: require("../data/audio/American_English_Beth/beth_en_us_04.mp3"),
			},
			{
				context: "findRoute",
				script:
					"Great! These are the possible routes that I've prepared for you.",
				voiceUrl: require("../data/audio/American_English_Beth/beth_en_us_05b.mp3"),
			},
			{
				context: "shortestJourney",
				script:
					"The shortest journey from, Alexanderplein, to, Rotterdam Centraal, is estimated to take 58 mins.",
				voiceUrl: require("../data/audio/American_English_Beth/beth_en_us_06b.mp3"),
			},
			{
				context: "congrats",
				script:
					"Congrats, you are arrived! You earned 76 shiny coins for this journey.",
				voiceUrl: require("../data/audio/American_English_Beth/beth_en_us_10.mp3"),
			},
			{
				context: "route",
				script: "Route description",
				routeVoices: [
					{
						context: "tram",
						script:
							"The tram to, Weesperplein, will depart from, Alexanderplein, at 11:08am.",
						voiceUrl: require("../data/audio/American_English_Beth/beth_en_us_07.mp3"),
					},
					{
						context: "walk",
						script: "Walk to the metro station",
						voiceUrl: null,
					},
					{
						context: "metro",
						script:
							"The metro to, Centraal Station, will depart from, Weesperplein station, at 11:14am.",
						voiceUrl: require("../data/audio/American_English_Beth/beth_en_us_08.mp3"),
					},
					{
						context: "walk",
						script: "Walk to the train station",
						voiceUrl: null,
					},
					{
						context: "train",
						script:
							"The train from, Amsterdam Centraal Station, to, Rotterdam Centraal Station, departs at 11:25 am from platform 11a.",
						voiceUrl: require("../data/audio/American_English_Beth/beth_en_us_09.mp3"),
					},
				],
			},
		],
	},
	{
		id: 2,
		name: "Australian English (Jack)",
		description: "Australian accent, male voice",
		voiceDemo: require("../data/audio/Australian_English_Jack/jack_en_au_01.mp3"),
		coins: 50,
		voices: [
			{
				context: "welcome",
				script: "Hoi! Let's go travelling",
				voiceUrl: require("../data/audio/Australian_English_Jack/jack_en_au_01.mp3"),
			},
			{
				context: "findLocation",
				script: "I'm here to help! Where can I guide you today?",
				voiceUrl: require("../data/audio/Australian_English_Jack/jack_en_au_02.mp3"),
			},
			{
				context: "travelTips",
				script:
					"Travel tips: Enjoy Rotterdam's iconic landmarks, such as Keulen Tower and Markt hal Building on your way to Rotterdam Centraal Station.",
				voiceUrl: require("../data/audio/Australian_English_Jack/jack_en_au_03.mp3"),
			},
			{
				context: "shoppingTips",
				script:
					"Shopping tips: Stop at the shopping area in the center of Rotterdam. Experience fashionable boutiques and local cuisine before continuing your journey.",
				voiceUrl: require("../data/audio/Australian_English_Jack/jack_en_au_04.mp3"),
			},
			{
				context: "findRoute",
				script:
					"Great! These are the possible routes that I've prepared for you.",
				voiceUrl: require("../data/audio/Australian_English_Jack/jack_en_au_05.mp3"),
			},
			{
				context: "shortestJourney",
				script:
					"The shortest journey from, Alexanderplein, to, Rotterdam Centraal, is estimated to take 58 mins.",
				voiceUrl: require("../data/audio/Australian_English_Jack/jack_en_au_06.mp3"),
			},
			{
				context: "congrats",
				script:
					"Congrats, you are arrived! You earned 76 shiny coins for this journey.",
				voiceUrl: require("../data/audio/Australian_English_Jack/jack_en_au_10.mp3"),
			},
			{
				context: "route",
				script: "Route description",
				routeVoices: [
					{
						context: "tram",
						script:
							"The tram to, Weesperplein, will depart from, Alexanderplein, at 11:08am.",
						voiceUrl: require("../data/audio/Australian_English_Jack/jack_en_au_07.mp3"),
					},
					{
						context: "walk",
						script: "Walk to the metro station",
						voiceUrl: null,
					},
					{
						context: "metro",
						script:
							"The metro to, Centraal Station, will depart from, Weesperplein station, at 11:14am.",
						voiceUrl: require("../data/audio/Australian_English_Jack/jack_en_au_08.mp3"),
					},
					{
						context: "walk",
						script: "Walk to the train station",
						voiceUrl: null,
					},
					{
						context: "train",
						script:
							"The train from, Amsterdam Centraal Station, to, Rotterdam Centraal Station, departs at 11:25 am from platform 11a.",
						voiceUrl: require("../data/audio/Australian_English_Jack/jack_en_au_09.mp3"),
					},
				],
			},
		],
	},
	{
		id: 3,
		name: "Dutch English (Alex)",
		description: "Dutch accent, male voice, normal speed",
		voiceDemo: require("../data/audio/Dutch_English_Alex/alex_nl_nl_01.mp3"),
		coins: 50,
		voices: [
			{
				context: "welcome",
				script: "Hoi! Let's go travelling",
				voiceUrl: require("../data/audio/Dutch_English_Alex/alex_nl_nl_01.mp3"),
			},
			{
				context: "findLocation",
				script: "I'm here to help! Where can I guide you today?",
				voiceUrl: require("../data/audio/Dutch_English_Alex/alex_nl_nl_02.mp3"),
			},
			{
				context: "travelTips",
				script:
					"Travel tips: Enjoy Rotterdam's iconic landmarks, such as Keulen Tower and Markt hal Building on your way to Rotterdam Centraal Station.",
				voiceUrl: require("../data/audio/Dutch_English_Alex/alex_nl_nl_03.mp3"),
			},
			{
				context: "shoppingTips",
				script:
					"Shopping tips: Stop at the shopping area in the center of Rotterdam. Experience fashionable boutiques and local cuisine before continuing your journey.",
				voiceUrl: require("../data/audio/Dutch_English_Alex/alex_nl_nl_04.mp3"),
			},
			{
				context: "findRoute",
				script:
					"Great! These are the possible routes that I've prepared for you.",
				voiceUrl: require("../data/audio/Dutch_English_Alex/alex_nl_nl_05b.mp3"),
			},
			{
				context: "shortestJourney",
				script:
					"The shortest journey from, Alexanderplein, to, Rotterdam Centraal, is estimated to take 58 mins.",
				voiceUrl: require("../data/audio/Dutch_English_Alex/alex_nl_nl_06b.mp3"),
			},
			{
				context: "congrats",
				script:
					"Congrats, you are arrived! You earned 76 shiny coins for this journey.",
				voiceUrl: require("../data/audio/Dutch_English_Alex/alex_nl_nl_10.mp3"),
			},
			{
				context: "route",
				script: "Route description",
				routeVoices: [
					{
						context: "tram",
						script:
							"The tram to, Weesperplein, will depart from, Alexanderplein, at 11:08am.",
						voiceUrl: require("../data/audio/Dutch_English_Alex/alex_nl_nl_07.mp3"),
					},
					{
						context: "walk",
						script: "Walk to the metro station",
						voiceUrl: null,
					},
					{
						context: "metro",
						script:
							"The metro to, Centraal Station, will depart from, Weesperplein station, at 11:14am.",
						voiceUrl: require("../data/audio/Dutch_English_Alex/alex_nl_nl_08.mp3"),
					},
					{
						context: "walk",
						script: "Walk to the train station",
						voiceUrl: null,
					},
					{
						context: "train",
						script:
							"The train from, Amsterdam Centraal Station, to, Rotterdam Centraal Station, departs at 11:25 am from platform 11a.",
						voiceUrl: require("../data/audio/Dutch_English_Alex/alex_nl_nl_09.mp3"),
					},
				],
			},
		],
	},
	{
		id: 4,
		name: "Indian English (Priya)",
		description: "Indian accent, female voice",
		voiceDemo: require("../data/audio/Indian_English_Priya/priya_en_in_01.mp3"),
		coins: 50,
		voices: [
			{
				context: "welcome",
				script: "Hoi! Let's go travelling",
				voiceUrl: require("../data/audio/Indian_English_Priya/priya_en_in_01.mp3"),
			},
			{
				context: "findLocation",
				script: "I'm here to help! Where can I guide you today?",
				voiceUrl: require("../data/audio/Indian_English_Priya/priya_en_in_02.mp3"),
			},
			{
				context: "travelTips",
				script:
					"Travel tips: Enjoy Rotterdam's iconic landmarks, such as Keulen Tower and Markt hal Building on your way to Rotterdam Centraal Station.",
				voiceUrl: require("../data/audio/Indian_English_Priya/priya_en_in_03.mp3"),
			},
			{
				context: "shoppingTips",
				script:
					"Shopping tips: Stop at the shopping area in the center of Rotterdam. Experience fashionable boutiques and local cuisine before continuing your journey.",
				voiceUrl: require("../data/audio/Indian_English_Priya/priya_en_in_04.mp3"),
			},
			{
				context: "findRoute",
				script:
					"Great! These are the possible routes that I've prepared for you.",
				voiceUrl: require("../data/audio/Indian_English_Priya/priya_en_in_05.mp3"),
			},
			{
				context: "shortestJourney",
				script:
					"The shortest journey from, Alexanderplein, to, Rotterdam Centraal, is estimated to take 58 mins.",
				voiceUrl: require("../data/audio/Indian_English_Priya/priya_en_in_06.mp3"),
			},
			{
				context: "congrats",
				script:
					"Congrats, you are arrived! You earned 76 shiny coins for this journey.",
				voiceUrl: require("../data/audio/Indian_English_Priya/priya_en_in_10.mp3"),
			},
			{
				context: "route",
				script: "Route description",
				routeVoices: [
					{
						context: "tram",
						script:
							"The tram to, Weesperplein, will depart from, Alexanderplein, at 11:08am.",
						voiceUrl: require("../data/audio/Indian_English_Priya/priya_en_in_07.mp3"),
					},
					{
						context: "walk",
						script: "Walk to the metro station",
						voiceUrl: null,
					},
					{
						context: "metro",
						script:
							"The metro to, Centraal Station, will depart from, Weesperplein station, at 11:14am.",
						voiceUrl: require("../data/audio/Indian_English_Priya/priya_en_in_08.mp3"),
					},
					{
						context: "walk",
						script: "Walk to the train station",
						voiceUrl: null,
					},
					{
						context: "train",
						script:
							"The train from, Amsterdam Centraal Station, to, Rotterdam Centraal Station, departs at 11:25 am from platform 11a.",
						voiceUrl: require("../data/audio/Indian_English_Priya/priya_en_in_09.mp3"),
					},
				],
			},
		],
	},
];

export { voicePackages };
