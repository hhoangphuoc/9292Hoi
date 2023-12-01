import React, { useState } from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";

//Function to render the feature which has the Slider elements

export default function FeatureSlider({ item }) {
	return (
		<View
			collapsable={false}
			className="flex-col h-14 w-full ml-4 pb-2 mt-2 mb-4"
		>
			{/* <View className="flex-col"> */}
			<Text className="text-sm text-neutral-100">{item.featureName}</Text>
			<Text
				className="text-xs italic text-neutral-100 opacity-75 text-clip mt-1"
				//max 2 lines
				numberOfLines={2}
			>
				{item.featureDescription}
			</Text>
			<View className="px-2 mt-1">
				<Slider
					className="w-48 h-10"
					// style={{width: 200, height: 40}}
					minimumValue={0}
					maximumValue={1}
					minimumTrackTintColor="#99f6e4"
					maximumTrackTintColor="#99f6e4"
				/>
			</View>
		</View>
	);
}
