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

export { BASE_URL, ENDPOINTS };
