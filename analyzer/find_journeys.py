import json

# Open the JSON file in read mode
with open('response_1700677167868.json', 'r') as file:
    # Load the JSON data
    data = json.load(file)

# Get the journeys
journeys = data.get('journeys', [])

# Sort journeys by durationInMinutes
if journeys:
    shortest_journey = min(journeys, key=lambda x: x['durationInMinutes'])
    min_duration = shortest_journey['durationInMinutes']

    min_duration_journeys = [journey for journey in journeys if journey['durationInMinutes']
                             == min_duration]

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

# If a journey with the minimum price is found, display it
if min_journey:
    print(json.dumps(min_journey, indent=2))
else:
    print("No journey found or 'fullPriceEuroCents' missing in the dataset.")
# Check if journeys were found and store their details
result_data = {}

# Add selected journeys data to the result_data dictionary
if shortest_journey:
    selected_journeys = {}

    selected_journeys['shortest_journey'] = [shortest_journey]  # Put the shortest journey into a list
    selected_journeys['minimum_change'] = [min(journeys, key=lambda x: x.get('numberOfChanges', float('inf')))]  # Choose the journey with the minimum change
    selected_journeys['cheapest_journey'] = [min_journey]
    result_data['selected_journey'] = selected_journeys
else:
    result_data['message'] = 'No journeys found.'

# Write the details of the selected journeys to a new JSON file
with open('journeys_details.json', 'w') as outfile:
    json.dump(result_data, outfile, indent=4)

# Retrieve relevant details from the selected shortest journey file

# Load data from the 'journeys_details.json' file
with open('journeys_details.json', 'r') as file:
    data = json.load(file)

selected_journey = data.get('selected_journey', {})

journey_service_info = []

# Check if 'selected_journey' exists and contains 'shortest_journey' and 'minimum_change'
if selected_journey and isinstance(selected_journey, dict):
    shortest_journey = selected_journey.get('shortest_journey', [])
    minimum_change = selected_journey.get('minimum_change', [])
    cheapest_journey = selected_journey.get('cheapest_journey', [])

    if isinstance(shortest_journey, list) and isinstance(minimum_change, list) and isinstance(cheapest_journey, list):
        for index, journey_type in enumerate([shortest_journey, minimum_change, cheapest_journey]):
            for item in journey_type:
                j_id = item['journeyId']
                departureTime = item['departureTime']
                arrivalTime = item['arrivalTime']
                changes = item['numberOfChanges']
                duration = item['durationInMinutes']

                journey_details = {
                    'journeyId': j_id,
                    'departureTime': departureTime,
                    'arrivalTime': arrivalTime,
                    'changes': changes,
                    'duration': duration,
                    'fareInCents': item['fareInfo']['fullPriceEuroCents'],
                    'legs': []
                }

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
                                'displayName': call.get('location', {}).get(
                                    'displayName')
                            }
                            leg_info['calls_info'].append(call_info)

                    journey_details['legs'].append(leg_info)

                if index == 0:
                    journey_service_info.append({'shortest_journey': journey_details})
                elif index ==1:
                    journey_service_info.append({'minimum_change': journey_details})
                else:
                    journey_service_info.append({'cheapest_journey': journey_details})

# Save to a JSON file with the updated structure
output_file = 'journey_info.json'
with open(output_file, 'w') as file:
    json.dump({'selected_journey': journey_service_info}, file, indent=2)