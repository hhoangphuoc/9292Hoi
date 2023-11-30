import React, { useEffect, useState, useRef } from "react";
import {
	View,
	Text,
	FlatList,
	Animated,
	useWindowDimensions,
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
// import Carousel from "react-native-snap-carousel";

// const { width: viewportWidth } = Dimensions.get("window");
const INITIAL_LAT_LONG = {
	latitude: 52.378706,
	longitude: 4.900489,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,
};

import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { modalityIcon } from "../constant";

export default function MapScreen({ route, navigation }) {
	const { legs, coinsPerLeg } = route.params;
	// console.log("legs", legs);
	// console.log("coinsPerLeg", coinsPerLeg);
	const { width } = useWindowDimensions();

	const [activeIndex, setActiveIndex] = useState(0);
	const [coordinates, setCoordinates] = useState([
		{
			latitude: 52.36352,
			longitude: 4.91914,
		},
		{
			latitude: 52.361157,
			longitude: 4.908037,
		},
	]);
	const [isMapReady, setIsMapReady] = useState(false);

	const [currentCoin, setCurrentCoin] = useState(coinsPerLeg[0]);

	const onMapLayout = () => {
		setIsMapReady(true);
	};
	const scrollX = useRef(new Animated.Value(0)).current;

	const viewableItemsChanged = useRef(({ viewableItems }) => {
		setActiveIndex(viewableItems[0].index);

		const selectedLeg = legs[viewableItems[0].index];
		console.log("selectedLeg", selectedLeg);
	}).current;
	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
	const slidesRef = useRef(null);

	const Pagination = ({ data, scrollX }) => {
		return (
			<View className="flex flex-row items-center self-center mt-2 py-2 px-2">
				{data.map((_, i) => {
					const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
					const dotWidth = scrollX.interpolate({
						inputRange,
						outputRange: [8, 16, 8],
						extrapolate: "clamp",
					});

					const opacity = scrollX.interpolate({
						inputRange,
						outputRange: [0.3, 1, 0.3],
						extrapolate: "clamp",
					});
					return (
						<Animated.View
							key={i.toString()}
							className="w-2 h-2 rounded-full mx-1"
							style={{
								width: dotWidth,
								opacity,
								backgroundColor: "#99f6e4",
							}}
						/>
					);
				})}
			</View>
		);
	};

	const JourneyCarousel = ({ item, index }) => {
		// console.log("leg", item);
		return (
			<View
				key={index}
				className="flex-1 justify-center bg-neutral-800 my-2 rounded-sm w-screen"
			>
				{/* Row 1: departure time and arrival time, justify content between */}
				<View
					className="flex flex-row justify-between py-1 px-2"
					// style={{ width: "100%" }}
				>
					<View className="flex-row items-center justify-center">
						<FontAwesome5 name="clock" size={16} color="#f5f5f5" />
						<Text className="text-neutral-100 text-lg ml-1 mb-0.5">
							{item?.departureTimeLeg.slice(11, 16)}
						</Text>
					</View>

					<Text className="text-neutral-100 text-sm mt-4">
						~ {item?.durationLeg} min
					</Text>
					<View className="flex-row items-center justify-center">
						<FontAwesome5 name="clock" size={16} color="#f5f5f5" />
						<Text className="text-neutral-100 text-lg ml-1 mb-0.5">
							{item?.arrivalTimeLeg.slice(11, 16)}
						</Text>
					</View>
				</View>

				{/* Row 2: modality icon and a horizontal line either solid or dotted */}
				<View className="flex flex-row items-start justify-start w-full py-1">
					{item?.modality === "Tram" ? (
						<MaterialIcons
							style={{ marginRight: 4, bottom: 4 }}
							name="tram"
							size={30}
							color="#f5f5f5"
						/>
					) : (
						<Ionicons
							style={{ marginRight: 4, bottom: 4 }}
							name={modalityIcon[item?.modality]}
							size={30}
							color="#f5f5f5"
						/>
					)}
					{item?.modality === "Walking" ? (
						<View className="flex flex-row items-start w-full mt-2 pr-3">
							<View className=" w-11/12 h-[2px] border-[2px] border-neutral-400 border-dashed mt-0.5" />
							<View className="w-[9px] h-[9px] rounded-full bg-neutral-100" />
						</View>
					) : (
						// <View className="w-full h-[2px] border-[1px] border-neutral-400 border-dashed mx-2" />
						// A horizontal line followed by a small white dot
						<View className="flex flex-row items-start w-full mt-2 pr-3">
							<View className=" w-11/12 h-[6px] border-[1px] bg-teal-400 pt-1" />
							<View className="w-[9px] h-[9px] rounded-full bg-neutral-100" />
						</View>
					)}
				</View>

				{/* Row 3: departure location and destination location*/}
				<View className="flex flex-row items-start justify-between px-1 pb-3">
					<View className="flex-col items-start justify-center px-1">
						<Text className="text-neutral-100 text-base text-ellipsis max-w-3xl pb-0.5">
							{item?.calls_info.length > 0
								? item?.calls_info[0].displayName
								: item?.startStopLeg}
						</Text>
						<Text className="text-neutral-100 text-sm pb-0.5">
							{item?.modalityOperator} {item?.modality}
						</Text>
					</View>
					{/* <FontAwesome5 name="arrow-right" size={16} color="#f5f5f5" /> */}
					<Text className="text-neutral-100 text-base px-1">
						{item?.endStopLeg}
					</Text>
				</View>
			</View>
		);
	};

	useEffect(() => {
		// const selectedLeg = legs[0];
		// const calls_length = selectedLeg?.calls_info.length;
		// //start location
		// const start = {
		// 	latitude: selectedLeg?.calls_info[0]?.latitude,
		// 	longitude: selectedLeg?.calls_info[0]?.longitude,
		// };
		// //end location
		// const end = {
		// 	latitude: selectedLeg?.calls_info[calls_length - 1]?.latitude,
		// 	longitude: selectedLeg?.calls_info[calls_length - 1]?.longitude,
		// };
		// setCoordinates([
		// 	...coordinates,
		// 	{ latitude: start.latitude, longitude: start.longitude },
		// 	{ latitude: end.latitude, longitude: end.longitude },
		// ]);
		// setCurrentCoin(coinsPerLeg[0]);
		// setActiveIndex(0);
	}, [activeIndex]);

	return (
		<View
			className="flex-1 flex-col items-center justify-center bg-neutral-900 pt-8"
			// style={{
			// 	width: width,
			// 	height: "100%",
			// }}
		>
			{/* Renders the map */}
			<View className="flex w-full h-2/3">
				<MapView
					style={{ flex: 1 }}
					// initialRegion={{
					// 	latitude: legs[0]?.calls_info[0]?.placeLatitude,
					// 	longitude: legs[0]?.calls_info[0]?.placeLongitude,
					// 	latitudeDelta: 0.0922,
					// 	longitudeDelta: 0.0421,
					// }}
					initialRegion={INITIAL_LAT_LONG}
					provider="google"
					showsUserLocation={true}
					onLayout={onMapLayout}
					zoomEnabled={true}
					minZoomLevel={8}
				>
					{/* Renders the polyline */}
					{isMapReady && (
							<Marker coordinate={coordinates[0]} pinColor="#99f6e4" />
						) && (
							<Marker coordinate={coordinates[coordinates.length - 1]}>
								<View className="flex flex-row items-center justify-center py-1 px-1">
									<Text className="text-neutral-100 text-lg mr-1">
										{currentCoin}
									</Text>
								</View>
								<FontAwesome5 name="coins" size={24} color="#eab308" />
							</Marker>
						) && (
							<Polyline
								coordinates={coordinates}
								strokeColor="#99f6e4"
								strokeWidth={4}
							/>
						)}
				</MapView>
			</View>
			<View
				className="flex flex-col items-center py-1 w-screen"
				// style={{
				// 	flex: 1,
				// }}
			>
				{/* Renders list of journey carousel */}
				<FlatList
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					pagingEnabled={true}
					bounces={false}
					data={legs}
					renderItem={({ item, index }) => (
						<JourneyCarousel item={item} key={index} />
					)}
					// keyExtractor={(item, index) => index.toString()}
					onScroll={
						Animated.event(
							[{ nativeEvent: { contentOffset: { x: scrollX } } }],
							{ useNativeDriver: false }
						)
						// (event) => {
						// const index = Math.round(event.nativeEvent.contentOffset.x / width);

						// console.log("index", index);
						// setActiveIndex(index);

						// const selectedLeg = legs[index];
						// const calls_length = selectedLeg?.calls_info.length;

						// //start location
						// const start = {
						// 	latitude: selectedLeg?.calls_info[0]?.latitude,
						// 	longitude: selectedLeg?.calls_info[0]?.longitude,
						// };

						// //end location
						// const end = {
						// 	latitude: selectedLeg?.calls_info[calls_length - 1]?.latitude,
						// 	longitude: selectedLeg?.calls_info[calls_length - 1]?.longitude,
						// };

						// setCoordinates([
						// 	...coordinates,
						// 	{ latitude: start.latitude, longitude: start.longitude },
						// 	{ latitude: end.latitude, longitude: end.longitude },
						// ]);

						// setCurrentCoin(coinsPerLeg[index]);
					}
					scrollEventThrottle={32}
					onViewableItemsChanged={viewableItemsChanged}
					viewabilityConfig={viewConfig}
					ref={slidesRef}
				/>
				{/* Renders the pagination */}
				<Pagination data={legs} scrollX={scrollX} />
			</View>
		</View>
	);
}
