import { View, Text } from "react-native";
import React from "react";

//each Carousel Item of the MapScreen
const JourneyCarousel = ({ leg }) => {
	return (
		<View className="flex flex-col items-center justify-center w-full h-full py-3">
			{/* Row 1: departure time and arrival time, justify content between */}
			<View className="flex flex-row items-center justify-between w-full">
				<Text className="text-neutral-100 text-lg">Departure time</Text>
				<Text className="text-neutral-100 text-lg">Arrival time</Text>
			</View>
		</View>
	);
};

export default JourneyCarousel;
