import json

# Open the JSON file in read mode
with open('response_1700218131014.json', 'r') as file:
    # Load the JSON data
    data = json.load(file)

# Get the journeys
journeys = data.get('journeys', [])
copied_data = data.copy()

for journey in copied_data['journeys']:
    duration = journey.get('durationInMinutes', 0)
    full_price = journey.get('fareInfo', {}).get('fullPriceEuroCents', 0)
    emission = journey.get('cO2EmissionInfo',{}).get('journeyEmission', 0)

    coins_collected = round(0.1 * duration + full_price * 0.01 + 10 / (emission + 1))
    journey['coinsCollected'] = coins_collected

# Sort journeys by durationInMinutes
if journeys:
    shortest_journey = min(journeys, key=lambda x: x['durationInMinutes'])
    min_duration = shortest_journey['durationInMinutes']

    min_duration_journeys = [journey for journey in journeys if journey['durationInMinutes'] == min_duration]

# Find the journey with the lowest price
min_price = float('inf')  # Set to infinity initially as a starting point
min_journey = None

for journey in journeys:
    fare_info = journey.get("fareInfo", {})
    full_price = fare_info.get("fullPriceEuroCents")

    # Check if 'fullPriceEuroCents' exists and is less than the current minimum
    if full_price is not None and full_price < min_price:
        min_price = full_price
        min_journey = journey

# Check if journeys were found and store their details
result_data = {}

if shortest_journey:
    selected_journeys = {}

    selected_journeys['journey1'] = [shortest_journey]  # Change entry 'shortest_journey' to 'journey1'
    selected_journeys['journey2'] = [min(journeys, key=lambda x: x.get('numberOfChanges', float('inf')))]  # Change entry 'minimum_change' to 'journey2'
    selected_journeys['journey3'] = [min_journey]  # Change entry 'cheapest_journey' to 'journey3'

    # Store other journeys with 'journeyX' as the key, maintaining continuous indexing
    other_journeys = {}
    count = 4  # Starting index for other journeys

    for journey in journeys:
        if journey in selected_journeys['journey1'] or journey in selected_journeys['journey2'] or journey == selected_journeys['journey3']:
            continue
        other_journeys[f'journey{count}'] = [journey]  # Encapsulate journey in a list
        count += 1

    selected_journeys.update(other_journeys)

    result_data['selected_journey'] = selected_journeys
else:
    result_data['message'] = 'No journeys found.'

# Write the details of the selected journeys to a new JSON file
with open('journeys_details.json', 'w') as outfile:
    json.dump(result_data, outfile, indent=4)

# Open the JSON file containing journey details in read mode
with open('journeys_details.json', 'r') as file:
    # Load the JSON data
    data = json.load(file)

journey_service_info = []

# Check if 'selected_journey' exists and contains journeys
if 'selected_journey' in data:
    selected_journey = data['selected_journey']

    for key, journey_type in selected_journey.items():
        if isinstance(journey_type, list):
            for item in journey_type:
                j_id = item['journeyId']
                departureTime = item['departureTime']
                arrivalTime = item['arrivalTime']
                changes = item['numberOfChanges']
                duration = item['durationInMinutes']
                coinsCollected = item['coinsCollected']

                journey_details = {
                    'journeyType': None,
                    'journeyId': j_id,
                    'departureTime': departureTime,
                    'arrivalTime': arrivalTime,
                    'changes': changes,
                    'duration': duration,
                    'fareInCents': item['fareInfo']['fullPriceEuroCents'],
                    'coinsCollected': coinsCollected,
                    'legs': []
                }

                if key == 'journey1':
                    journey_details[
                        'journeyType'] = "shortest_journey"  # Replace 'type' with 'shortest_journey'
                elif key == 'journey2':
                    journey_details[
                        'journeyType'] = "minimal_change'"
                elif key == 'journey3':
                    journey_details[
                        'journeyType'] = "cheapest_journey"

                for leg_index, leg in enumerate(item['legs']):
                    leg_info = {
                        'modality': leg.get('modalityGroup'),
                        'departureTimeLeg': leg.get('departureTime'),
                        'arrivalTimeLeg': leg.get('arrivalTime'),
                        'durationLeg': leg.get('durationInMinutes'),
                        'startStopLeg': leg.get('from'),
                        'endStopLeg': leg.get('to'),
                        'occupancy': leg.get('occupancy'),
                        'calls_info': []
                    }

                    if leg_info['modality'] != 'Walking':
                        for call in leg['calls']:
                            call_info = {
                                'departureTime': call.get('departureTime'),
                                'displayName': call.get('location', {}).get('displayName'),
                                'platform': call.get('platform')
                            }
                            leg_info['calls_info'].append(call_info)

                    journey_details['legs'].append(leg_info)

                journey_service_info.append({key: journey_details})


# Save to a JSON file with the updated structure
output_file = 'journey_info.json'
with open(output_file, 'w') as file:
    json.dump({'selected_journey': journey_service_info}, file, indent=2)
