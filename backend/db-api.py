from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)


def get_db_connection():
    conn = sqlite3.connect('9292_hoi.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/add_travel_record', methods=['POST'])
def add_travel_record():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        # "INSERT INTO TravelHistory (JourneyID, DepartureTime, ArrivalTime, Changes, Duration) VALUES (?, ?, ?, ?, ?, ?)",
        "INSERT INTO TravelHistory (journeyId, date, departureTime, arrivalTime, departure, arrival, fareInCents, coinsCollected, Co2Emission) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (data['journeyId'], data['date'], data['departureTime'],
         data['arrivalTime'], data['departure'], data['arrival'], data['fareInCents'], data['coinsCollected'], data['Co2Emission']))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"}), 201


@app.route('/get_travel_history', methods=['GET'])
def get_travel_history():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM TravelHistory")
    records = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in records])


if __name__ == '__main__':
    app.run(debug=True)
