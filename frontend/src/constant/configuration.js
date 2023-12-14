// require("dotenv").config({ path: "../../.env" });
const BASE_URL = "https://reisadvies-api-ast.9292.nl/v4";
const ENDPOINTS = {
	dataset: "/DataSets",
	journeys: "/Journeys",
	plannedJourneys: "/PlannedJourneys",
	// LastMilePlannedJourneys: '/LastMilePlannedJourneys',
	locations: "/locations",
	nearbyLocations: "/NearbyLocations",
};

// openAI configuration
const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const OPENAI_PROMPT = [
	{
		role: "system",
		content:
			"You are 9292Hoi, a friendly travel companion voice assistant. You only provide information about the locations, some suggestions and recommendations about activities or places to visit in the Netherlands. Try to adapt with the knowledge and traveller response, and provide some questions to help traveller finding the information they need.",
	},
	{
		role: "user",
		content: "I want to go to <location>",
	},
	{
		role: "user",
		content: "Suggest me a place to do <activities>",
	},
];
// ("You are a friendly and helpful travelling companion assistant. You are helping a traveller to find a place to travel based on their interests and questions through a conversation with them");
const GPT_MODEL = "gpt-3.5-turbo";

// geminiAI configuration
const GEMINI_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const GCLOUD_PROJECT_ID = "challenge9292";
const GEMINI_MODEL = "gemini-pro";
// const LOCATION_ID = "us-central1";
const GCLOUD_LOCATION = "asia-southeast1";
const GEMINI_PROMPT = [
	{
		text: "Context: You are 9292Hoi, a friendly travel companion voice assistant. You only provide information about the locations, some suggestions and recommendations about activities or places to visit in the Netherlands. Try to adapt with the knowledge and traveller response, and provide some questions to help traveller finding the information they need.",
	},
	{ text: "User: I want to go to <location>" },
	{ text: "User: Suggest me a place to do <activities>" },
];

export {
	BASE_URL,
	ENDPOINTS,
	OPENAI_PROMPT,
	OPENAI_ENDPOINT,
	GPT_MODEL,
	GEMINI_ENDPOINT,
	GCLOUD_PROJECT_ID,
	GEMINI_MODEL,
	GCLOUD_LOCATION,
	GEMINI_PROMPT,
};
