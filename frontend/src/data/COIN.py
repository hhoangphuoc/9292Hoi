import json

with open('response_1700218131014.json', 'r') as file:
    original_data = json.load(file)

copied_data = original_data.copy()

for journey in copied_data['journeys']:
    duration = journey.get('durationInMinutes', 0)
    full_price = journey.get('fareInfo', {}).get('fullPriceEuroCents', 0)
    emission = journey.get('cO2EmissionInfo',{}).get('journeyEmission', 0)

    coins_collected = round(0.1 * duration + full_price * 0.01 + 10 / (emission + 1))
    journey['coinsCollected'] = coins_collected

with open('CoinsCollected.json', 'w') as output_file:
    json.dump(copied_data, output_file, indent=2)