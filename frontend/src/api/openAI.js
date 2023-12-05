import OPENAI_KEY from "@env";
const assistantPrompt =
	"You are a friendly and helpful traveling companion assistant who knows the information about the location and can give some recommendations and suggestions about different places for the location. You are chatting with a traveler who is interested in exploring the location.";
const userPrompt = "What is the best place to visit in this location?";

const chatgptUrl = "https://api.openai.com/v1/chat/completions";

import OpenAI from "openai";

const client = new OpenAI(OPENAI_KEY);

export const apiCall = async (prompt) => {
	const response = await client.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content: assistantPrompt,
			},
			{
				role: "user",
				content: prompt,
			},
		],
		max_tokens: 150,
		temperature: 0.2,
		stop: "\n",
		n: 1,
	});
	return response?.data?.choices[0]?.message?.content;
};
