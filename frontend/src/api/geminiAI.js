import GOOGLE_AI_KEY from "@env";
import VertexAI from "@google-cloud/aiplatform";

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const projectId = "challenge9292";
const location = "asia-southeast1";
const model = "gemini-pro";

const geminiPrompt = [
	{
		text: "Context: You are 9292Hoi, a friendly travel companion voice assistant. You only provide information about the locations, some suggestions and recommendations about activities or places to visit in the Netherlands. Try to adapt with the knowledge and traveller response, and provide some questions to help traveller finding the information they need.",
	},
	{ text: "User: I want to go to <location>" },
	{ text: "User: Suggest me a place to do <activities>" },
];

// Initialize Vertex with your Cloud project and location
const vertexAI = new VertexAI({ project: projectId, location: location });

// Instantiate the model
const generativeModel = vertexAI.preview.getGenerativeModel({
	model: model,
	generation_config: {
		max_output_tokens: 2048,
		temperature: 0.9,
		top_p: 1,
	},
});

export const geminiApiCall = async (prompt) => {
	const chat = generativeModel.startChat({});
	const chatInput = prompt;

	console.log(`User: ${chatInput}`);

	const response = await chat.sendMessageStream(chatInput);
	for await (const item of response.stream) {
		return item.candidates[0].content.parts[0].text;
	}
};
