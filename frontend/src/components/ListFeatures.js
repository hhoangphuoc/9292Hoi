import React, { useState, useRef } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";

//icons
import { Ionicons } from "@expo/vector-icons";

import Animated, {
	useAnimatedRef,
	useSharedValue,
	useAnimatedStyle,
	runOnUI,
	measure,
	useDerivedValue,
	withTiming,
	withSpring,
} from "react-native-reanimated";

//from src
import FeatureSwitch from "./FeatureSwitch";
import FeatureSlider from "./FeatureSlider";
import FeatureNavigation from "./FeatureNavigation";

export default function ListFeatures({ list }) {
	const listRef = useAnimatedRef();
	const open = useSharedValue(false);

	const progress = useDerivedValue(() => {
		// return withTiming(open.value ? 0 : 1, { duration: 500 });
		open.value ? withTiming(1) : withTiming(0);
	});
	const heightValue = useSharedValue(0);
	const heightAnimationStyle = useAnimatedStyle(() => ({
		height: heightValue.value,

		// opacity: progress.value === 0 ? 0 : 1,
	}));
	const listStyle = useAnimatedStyle(() => ({
		opacity: progress.value === 0 ? 0 : 1,
		// justifyContent: progress.value === 0 ? 'flex-start' : 'space-between',
		paddingVertical: progress.value === 0 ? 0 : 8,
		paddingHorizontal: progress.value === 0 ? 0 : 8,
	}));
	// const style = useAnimatedStyle(() => ({
	//     height: height.value *  progress.value + 1,
	//     opacity: progress.value === 0 ? 0 : 1,
	// }));
	// const iconStyle = useAnimatedStyle(() => ({
	//     transform: [{ rotate: `${progress.value *180}deg` }],
	// }));

	return (
		<View className="bg-black flex overflow-hidden">
			<View className="flex-col">
				<Pressable
					onPress={() => {
						if (heightValue.value === 0) {
							runOnUI(() => {
								"worklet";
								const measuredSize = withTiming(measure(listRef), {
									duration: 100,
								});
								heightValue.value = measuredSize.height;
							})();
						} else {
							heightValue.value = withTiming(0);
						}
						open.value = !open.value;
					}}
					className="flex-row items-center justify-between py-5 px-3 bg-black shadow mb-2 w-full"
				>
					<View className="flex-row items-center">
						<Ionicons name="create-outline" size={24} color="#ffffff" />
						<Text className="text-white text-base ml-2">{list.title}</Text>
					</View>
					<Animated.View>
						<Ionicons name="chevron-down-outline" size={24} color={"white"} />
					</Animated.View>
				</Pressable>
				<View className="w-full h-[1px] bottom-4 bg-neutral-400"></View>
				<Animated.View style={heightAnimationStyle}>
					<Animated.View collapsable={false} ref={listRef} style={listStyle}>
						{list.data.map((item, index) => {
							if (item.type === "switch") {
								return (
									<FeatureSwitch key={index} item={item} isEnabled={false} />
								);
							} else if (item.type === "slider") {
								return <FeatureSlider key={index} item={item} />;
							} else {
								return <FeatureNavigation key={index} item={item} />;
							}
						})}
					</Animated.View>
				</Animated.View>
			</View>
		</View>
	);
}
