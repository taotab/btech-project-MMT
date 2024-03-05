from flask import Flask, render_template, request, jsonify
import sqlite3
import os

app = Flask(__name__)

latest_data = {"Humidity": "N/A", "Temperature": "N/A", "Timestamp": "N/A"}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_latest_data', methods=['GET'])
def get_latest_data():
    return jsonify(latest_data)


@app.route('/receive_data', methods=['POST'])
def receive_data():
    try:
        data = request.get_json(force=True)
        print("Received data:", data)

        # Get the path to the current directory
        current_dir = os.path.dirname(os.path.realpath(__file__))
        db_path = os.path.join(current_dir, 'sensor.db')

        # Create a database connection and cursor
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        # Insert data into the database
        cursor.execute("INSERT INTO sensor_data (temperature, humidity, timestamp) VALUES (?, ?, ?)",
                       (data["Temperature"], data["Humidity"], data["Timestamp"]))

        # Commit changes and close the connection
        conn.commit()
        conn.close()

        global latest_data
        latest_data["Timestamp"] = data.get("Timestamp", "N/A")
        latest_data["Humidity"] = data.get("Humidity", "N/A")
        latest_data["Temperature"] = data.get("Temperature", "N/A")

        return jsonify({"status": "success"})
    except Exception as e:
        print(f"Error processing data: {str(e)}")
        return jsonify({"status": "error"}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
