# create 2 journeies with the shortest travelling time

import json

# Open the JSON file in read mode
with open('response_1700225364785.json', 'r') as file:
    # Load the JSON data
    data = json.load(file)

# Get the journeys
journeys = data.get('journeys', [])

# Sort journeys by durationInMinutes
sorted_journeys = sorted(journeys, key=lambda x: x['durationInMinutes'])

# Select the two shortest journeys
shortest_journeys = sorted_journeys[:2]

# Check if journeys were found and store their details
result_data = {}
if shortest_journeys:
    result_data['shortest_journeys'] = shortest_journeys
else:
    result_data['message'] = 'No journeys found.'

# Write the details of the two shortest journeys to a new JSON file
with open('shortest_journeys_details.json', 'w') as outfile:
    json.dump(result_data, outfile, indent=4)

# Display the result on the console
if 'message' not in result_data:
    print("Details of the Two Shortest Journeys:")
    print(json.dumps(result_data, indent=4))
else:
    print(result_data['message'])

# retrieve relevant details from the selected shortest journey file

# Load data from the 'shortest_journey_details.json' file
with open('shortest_journeys_details.json', 'r') as file:
    data = json.load(file)

journeys = data['shortest_journeys']

journey_service_info = {}

for item in journeys:
    j_id = item['journeyId']
    departureTime = item['departureTime']
    arrivalTime = item['arrivalTime']
    changes = item['numberOfChanges']
    duration = item['durationInMinutes']

    # Create a dictionary to store journey details
    journey_details = {
        'journeyId': j_id,
        'departureTime': departureTime,
        'arrivalTime': arrivalTime,
        'changes': changes,
        'duration': duration,
        'legs': {}
        # Create a dictionary to store lists of leg_service information
    }

    for index, leg in enumerate(item['legs']):
        leg_info = {
            'modality': leg.get('modalityGroup'),
            'departureTimeLeg': leg.get('departureTime'),
            'arrivalTimeLeg': leg.get('arrivalTime'),
            'durationLeg': leg.get('durationInMinutes'),
            'startStopLeg': leg.get('from'),
            'endStopLeg': leg.get('to'),
            'occupancy': leg.get('occupancy')
        }

        # Check if 'service', 'operator', and 'destination' information exists in the leg
        if all(key in leg for key in ['service', 'operator', 'destination']):
            leg_info.update({
                'service': leg['service'],
                'operator': leg['operatorName'],
                'destination': leg['destination']
            })
        else:
            leg_info.update({
                'service': leg.get('service'),
                'operator': leg.get('operatorName'),
                'destination': leg.get('destination')
            })

        if index not in journey_details['legs']:
            journey_details['legs'][index] = []

        journey_details['legs'][index].append(leg_info)

    # Store journey details using the journeyId as a key
    journey_service_info[j_id] = journey_details

# Save to a JSON file
output_file = 'journey_info.json'
with open(output_file, 'w') as file:
    json.dump(list(journey_service_info.values()), file, indent=2)

