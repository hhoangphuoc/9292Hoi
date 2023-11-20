import React, { useState } from "react";
import { View, Text, Switch } from "react-native";

//Function to render the feature which has the Switch (Enable/Disable)

export default function FeatureSwitch({ item, isEnabled }) {
	const [enabled, setEnabled] = useState(isEnabled);
	const toggleSwitch = () => {
		// onToggle(item.id, !isEnabled);
		setEnabled((previousState) => !previousState);
	};

	return (
		<View
			collapsable={false}
			className="flex-1 flex-row items-start justify-between h-14 w-full mb-4"
		>
			<View className="flex-col bg-black w-4/5">
				<Text className="flex-1 text-sm text-white ml-8">
					{item.featureName}
				</Text>
				<Text
					className="text-xs italic text-white ml-8"
					numberOfLines={3}
					ellipsizeMode="tail"
				>
					{item.featureDescription}
				</Text>
			</View>
			<Switch
				trackColor={{ false: "#767577", true: "#99f6e4" }}
				thumbColor={isEnabled ? "#f5dd4b" : "#f5f5f5"}
				// ios_backgroundColor="#3e3e3e"
				onValueChange={toggleSwitch}
				value={enabled}
			/>
		</View>
	);
}
