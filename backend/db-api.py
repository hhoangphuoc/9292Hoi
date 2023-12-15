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
        "INSERT INTO TravelHistory (JourneyID, TravelDate, DepartureTime, ArrivalTime, Changes, Duration) VALUES (?, ?, ?, ?, ?, ?)",
        (data['JourneyID'], data['TravelDate'],
         data['DepartureTime'], data['ArrivalTime'], data['Changes'], data['Duration']))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"}), 201


@app.route('/get_travel_history/<int:user_id>', methods=['GET'])
def get_travel_history(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM TravelHistory")
    records = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in records])


if __name__ == '__main__':
    app.run(debug=True)
