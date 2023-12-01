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
			className="flex flex-row items-start justify-between w-full ml-4 pb-2 mt-2 mb-2"
		>
			<View className="flex flex-col w-4/5">
				<Text className="text-sm text-neutral-100">{item.featureName}</Text>
				<Text
					className="text-xs italic opacity-75 text-neutral-100 text-clip mt-1"
					numberOfLines={3}
					// ellipsizeMode="tail"
				>
					{item.featureDescription}
				</Text>
			</View>
			<Switch
				style={{
					marginRight: 8,
				}}
				trackColor={{ false: "#767577", true: "#99f6e4" }}
				thumbColor={isEnabled ? "#f5dd4b" : "#f5f5f5"}
				// ios_backgroundColor="#3e3e3e"
				onValueChange={toggleSwitch}
				value={enabled}
			/>
		</View>
	);
}
