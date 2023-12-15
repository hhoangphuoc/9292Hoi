const BASE_URL = "https://reisadvies-api-ast.9292.nl/v4";

import { TOKEN_9292 } from "@env";
import axios from "axios";

//fecth Location using axios
//path: BASE_URL/Locations?query={query}&Rows=5
export const fetchLocations = async (query) => {
	const headers = {
		Authorization: `Token ${TOKEN_9292}`,
	};
	const response = await axios.get(
		`${BASE_URL}/Locations?query=${query}&Rows=5`,
		{ headers }
	);
	return response.data.locations;
};

//fetch Journey using axios
//path: BASE_URL/journeys?fromId={fromId}&toId={toId}
export const fetchJourneys = async (fromId, toId) => {
	const headers = {
		Authorization: `Token ${TOKEN_9292}`,
	};
	const response = await axios.get(
		`${BASE_URL}/journeys?fromId=${fromId}&toId=${toId}`,
		{ headers }
	);
	return response.data.journeys;
};

// const HEADERS = new Headers();
// HEADERS.append("Authorization", `Token ${TOKEN_9292}`);

//fetch Location
// async function fetchLocations(query) {
// 	const headers = new Headers();
// 	headers.append("Authorization", `Token ${TOKEN_9292}`);
// 	console.log("fetching locations from 9292...");
// 	const response = await fetch(
// 		`https://reisadvies-api-ast.9292.nl/v4/Locations?query=${query}&Rows=5`,
// 		{
// 			method: "GET",
// 			headers,
// 		}
// 	);

// 	const data = await response.json();
// 	setLocationList(data.locations);

// 	console.log("Found Locations: ", data.locations);
// }
