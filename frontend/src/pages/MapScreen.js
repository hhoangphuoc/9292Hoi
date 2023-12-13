import React, { useEffect, useState, useRef } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Animated,
	useWindowDimensions,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { modalityIcon } from "../constant";
import { GOOGLE_MAPS_KEY } from "@env";

import { useSelector } from "react-redux";
import { Audio } from "expo-av";

const mapStyle = require("../data/mapStyle.json");

export default function MapScreen({ route, navigation }) {
	const { legs, coinsPerLeg } = route.params;

	//state for sound
	const routeVoices = useSelector(
		(state) => state.selectedVoice.voices[7].routeVoices
	); //list of voices of all the routes
	console.log("routeVoices", routeVoices);
	//state for map
	const { width, height } = useWindowDimensions();
	const INITIAL_LAT_LONG = {
		//initial map view
		latitude: 52.361157,
		longitude: 4.908037,
		latitudeDelta: 0.002363,
		longitudeDelta: 0.011103,
	};
	const [activeIndex, setActiveIndex] = useState(0);
	const [coordinates, setCoordinates] = useState([
		{
			//start location
			latitude: 52.36352,
			longitude: 4.91914,
		},
		{
			//end location
			latitude: 52.361157,
			longitude: 4.908037,
		},
	]);
	const [region, setRegion] = useState(INITIAL_LAT_LONG);
	const [directionMode, setDirectionMode] = useState("TRANSIT");
	const [currentCoin, setCurrentCoin] = useState(coinsPerLeg[0]);

	const [sound, setSound] = useState();
	const [startStopLocation, setStartStopLocation] = useState({});

	//for carousel animation
	const scrollX = useRef(new Animated.Value(0)).current;
	const viewableItemsChanged = useRef(({ viewableItems }) => {
		setActiveIndex(viewableItems[0].index);
	}).current;
	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
	const slidesRef = useRef(null);

	const mapRef = useRef(null);

	//screen components
	const Pagination = ({ data, scrollX }) => {
		return (
			<View className="flex flex-row items-center self-center px-2 py-1">
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
				className="flex-1 justify-center bg-neutral-800 mb-2 mt-4 rounded-sm w-screen"
			>
				{/* Row 1: departure time and arrival time, justify content between */}
				<View
					className="flex flex-row justify-between py-1 px-2"
					// style={{ width: "100%" }}
				>
					<View className="flex-row items-center justify-center">
						<FontAwesome5 name="clock" size={16} color="#f5f5f5" />
						<Text className="text-neutral-100 text-base ml-1 mb-0.5">
							{item?.departureTimeLeg.slice(11, 16)}
						</Text>
					</View>

					<Text className="text-neutral-100 text-xs mt-4 top-3">
						~ {item?.durationLeg} min
					</Text>
					<View className="flex-row items-center justify-center">
						<FontAwesome5 name="clock" size={16} color="#f5f5f5" />
						<Text className="text-neutral-100 text-base ml-1 mb-0.5">
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
						{/* Departure Location */}
						<Text className="text-neutral-100 text-sm text-ellipsis max-w-3xl pb-0.5">
							{item?.calls_info.length > 0
								? item?.calls_info[0].displayName
								: item?.startStopLeg}
						</Text>
						{/* Transport Operator */}
						<Text className="text-neutral-100 text-xs pb-0.5">
							{item?.modalityOperator} {item?.modality}
						</Text>
						{/* Platform Number */}
						{item?.calls_info[0]?.platform && (
							<Text className="text-neutral-100 text-xs pb-0.5">
								Platform - {item.calls_info[0].platform}
							</Text>
						)}
					</View>
					{/* <FontAwesome5 name="arrow-right" size={16} color="#f5f5f5" /> */}
					{/* Arrival Location */}
					<Text className="text-neutral-100 text-sm px-1">
						{item?.endStopLeg}
					</Text>
				</View>
			</View>
		);
	};

	const handlePlay = async (item) => {
		console.log("Loading Sound");
		const { sound } = await Audio.Sound.createAsync(item.voiceUrl);
		setSound(sound);

		console.log("Playing Sound");
		await sound.playAsync();
	};

	//when the index changes, update the coordinates, the current coins and the mode of transport
	useEffect(() => {
		const selectedLeg = legs[activeIndex];
		const calls_length = selectedLeg?.calls_info.length;

		//start location latlong
		const start = {
			latitude: selectedLeg?.calls_info[0]?.latitude,
			longitude: selectedLeg?.calls_info[0]?.longitude,
		};

		//end location latlong
		const end = {
			latitude: selectedLeg?.calls_info[calls_length - 1]?.latitude,
			longitude: selectedLeg?.calls_info[calls_length - 1]?.longitude,
		};

		setStartStopLocation({
			startLocation: selectedLeg?.startStopLeg,
			endLocation: selectedLeg?.endStopLeg,
		});

		//set to the different coordinates for the map, replacing the previous coordinates
		setCoordinates([
			{ latitude: start.latitude, longitude: start.longitude },
			{ latitude: end.latitude, longitude: end.longitude },
		]);
		setRegion({
			latitude: (start.latitude + end.latitude) / 2,
			longitude: (start.longitude + end.longitude) / 2,
			latitudeDelta: Math.abs(start.latitude - end.latitude),
			longitudeDelta: Math.abs(start.longitude - end.longitude),
		});

		setCurrentCoin(coinsPerLeg[activeIndex]);
		setDirectionMode(
			selectedLeg?.modality === "Walking" ? "WALKING" : "TRANSIT"
		);

		//change the camera view based on the region
		if (mapRef?.current) {
			mapRef?.current.animateToRegion({});
		}
	}, [activeIndex]);

	//play the voice when the index changes (only once)
	useEffect(() => {
		if (routeVoices[activeIndex]?.context === "walk") {
			return;
		}
		const sound = new Audio.Sound();
		const loadAndPlayAudio = async () => {
			try {
				await sound.loadAsync(routeVoices[activeIndex]?.voiceUrl);
				await sound.playAsync();
			} catch (error) {
				console.error("AUDIO PLAY: ", error);
			}
		};
		loadAndPlayAudio();
		return () => {
			sound.unloadAsync(); // Unload the sound when the component unmounts
		};
	}, [activeIndex]);

	return (
		<View className="flex-1 items-center justify-center bg-neutral-900 pt-8">
			{/* Renders the map */}
			<View className="flex w-full h-2/3">
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className="absolute top-3 w-12 h-12 mt-3 ml-1 z-20 rounded-full bg-neutral-700 items-center justify-center"
				>
					<Ionicons name="arrow-back" size={24} color="#f5f5f5" />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						if (routeVoices[activeIndex]?.context === "walk") {
							return;
						}
						handlePlay(routeVoices[activeIndex]);
					}}
					className="absolute bottom-1 w-12 h-12 mt-4 ml-1.5 z-20 rounded-md bg-neutral-700 items-center justify-center"
				>
					<Ionicons name="volume-high" size={26} color="#5eead4" />
				</TouchableOpacity>
				<MapView
					style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
					initialRegion={INITIAL_LAT_LONG}
					region={region}
					provider={PROVIDER_GOOGLE}
					zoomEnabled={true}
					userInterfaceStyle="dark"
					customMapStyle={mapStyle}
					loadingIndicatorColor="#99f6e4"
					loadingEnabled={true}
					zoomControlEnabled={true}
					ref={mapRef}
				>
					{coordinates.length > 0 && (
						<MapViewDirections
							origin={coordinates[0]}
							destination={coordinates[coordinates.length - 1]}
							apikey={GOOGLE_MAPS_KEY}
							strokeWidth={4}
							strokeColor="#f5f5f5" //neutral-100
							mode={directionMode}
							lineDashPattern={directionMode === "WALKING" ? [0] : null}
						/>
					)}
					<Marker
						coordinate={coordinates[0]}
						title={startStopLocation.startLocation}
						description="Start location"
						identifier="startLocation"
						// pinColor="#f43f5e"
						style={{ paddingBottom: 5, paddingRight: 5 }}
					>
						<FontAwesome5 name="walking" size={30} color="#f43f5e" />
					</Marker>
					<Marker
						coordinate={coordinates[coordinates.length - 1]}
						title={startStopLocation.endLocation}
						description="End location"
						identifier="endLocation"
					>
						<FontAwesome5 name="map-marker-alt" size={30} color="#f43f5e" />
						<FontAwesome5 name="coins" size={24} color="#eab308" />
						{/* </View> */}
					</Marker>
				</MapView>
			</View>
			<View className="flex flex-col items-center py-1 w-screen">
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
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{ useNativeDriver: false }
					)}
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
