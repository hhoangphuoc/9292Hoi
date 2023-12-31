import { Audio } from "expo-av";

export function formatJourney(journey) {
	const journeyType = journey?.journeyType;
	const journeyId = journey?.journeyId;
	const legs = journey?.legs;
	const coins = journey?.coinsCollected;
	const price = journey?.fareInCents / 100;
	const duration = journey?.duration;
	const durationStr = `${Math.floor(journey?.duration / 60)}h ${
		journey?.duration % 60
	}m`;
	const Co2Emission = journey?.Co2Emission;
	const modalities = legs.map((leg) => leg?.modality);

	const formattedJourney = {
		journeyType: journeyType,
		journeyId: journeyId,
		date: journey?.departureTime.slice(0, 10),
		dTime: journey?.departureTime.slice(11, 16),
		aTime: journey?.arrivalTime.slice(11, 16),
		duration: duration,
		durationStr: durationStr,
		price: price,
		legs: legs,
		coins: coins,
		Co2Emission: Co2Emission, //added Co2Emission
		modalities: modalities,
	};

	return formattedJourney;
}

//function that play the audio when user press play button
export async function handlePlay(item, setSound) {
	console.log("Loading Sound");
	const { sound } = await Audio.Sound.createAsync(item.voiceUrl);
	setSound(sound);

	console.log("Playing Sound");
	await sound.playAsync();
}

//function that stop the audio when user press stop button
export async function handleStop(sound) {
	console.log("Unloading Sound");
	await sound.unloadAsync();
}
