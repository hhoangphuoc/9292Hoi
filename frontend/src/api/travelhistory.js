const BACKEND_LOCAL = "http://127.0.0.1:5000";

import axios from "axios";
export const getTravelHistory = async () => {
	const response = await axios.get(`${BACKEND_LOCAL}/get_travel_history`);
	console.log("GET: ", response.data);

	return response.data;
};

//add travel history
export const addTravelHistory = async (journey) => {
	console.log("POST the journey: ", journey);

	const response = await axios
		.post(`${BACKEND_LOCAL}/add_travel_record`, journey)
		.then((response) => {
			console.log("POST: ", response.data);
			return response.data;
		})
		.catch((error) => {
			console.log("Error: ", error);
		});

	// console.log("POST: ", response.data);
	// return response.data;
};
export const getTotalCoins = async () => {
	const response = await axios.get(`${BACKEND_LOCAL}/get_travel_history`);

	//calculate the total coins
	let totalCoins = 0;
	response.data.forEach((travelHistory) => {
		totalCoins += travelHistory.coinsCollected;
	});

	console.log("GET: ", totalCoins, " coins");
	return totalCoins;
};

//Functions using fetch
//get the total number of coins attribute from the travel history
// export const getTotalCoins = async () => {
// 	try {
// 		const response = await fetch(`${BACKEND_LOCAL}/get_travel_history`);
// 		const data = await response.json();

// 		//calculate the total coins
// 		let totalCoins = 0;
// 		data.forEach((travelHistory) => {
// 			totalCoins += travelHistory.coinsCollected;
// 		});

// 		console.log("GET: ", totalCoins, " coins");
// 		return totalCoins;
// 	} catch (error) {
// 		console.log("Error: ", error);
// 	}
// };

// export const addTravelHistory = async (journey) => {
// 	console.log("POST the journey: ", journey);

// 	try {
// 		const response = await fetch(`${BACKEND_LOCAL}/add_travel_record`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(journey),
// 		});

// 		const data = await response.json();
// 		console.log("POST: ", data);
// 		return data;
// 	} catch (error) {
// 		console.log("Error: ", error);
// 	}
// };

// export const getTravelHistory = async () => {
// 	try {
// 		const response = await fetch(`${BACKEND_LOCAL}/get_travel_history`);
// 		const data = await response.json();
// 		console.log("GET: ", data);
// 		return data;
// 	} catch (error) {
// 		console.log("Error: ", error);
// 	}
// };
