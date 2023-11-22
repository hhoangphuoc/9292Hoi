const BASE_URL = "https://reisadvies-api-ast.9292.nl/v4";

const TOKEN = "BPrtUvtota0IbdMkwYOt";

const HEADERS = new Headers();
HEADERS.append("Authorization", `Token ${TOKEN}`);

//fetch Location
async function fetchLocations(query, setLocationList) {
	const headers = new Headers();
	headers.append("Authorization", `Token ${TOKEN}`);

	const response = await fetch(
		`https://reisadvies-api-ast.9292.nl/v4/Locations?query=${query}&Rows=5`,
		{
			method: "GET",
			headers,
		}
	);

	const data = await response.json();
	console.log("Location list:", data.locations);
	setLocationList(data.locations);
}

//fetch Journeys
async function fetchJourneys(fromId, toId, setJourneyList) {
	const headers = new Headers();
	headers.append("Authorization", `Token ${TOKEN}`);

	const response = await fetch(
		`https://reisadvies-api-ast.9292.nl/v4/journeys?fromId=${fromId}&toId=${toId}`,
		{
			method: "GET",
			headers,
		}
	);

	const data = await response.json();
	console.log("Journey list:", data.journeys);
	setJourneyList(data.journeys);
}
