# server code flask.


from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

latest_data = {"SensorValue": "N/A", "Timestamp": "N/A"}


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

        global latest_data
        latest_data["Timestamp"] = data.get(
            "Timestamp", "N/A")  # Update timestamp
        latest_data["SensorValue"] = data.get(
            "SensorValue", "N/A")  # Update sensor value

        return jsonify({"status": "success"})
    except Exception as e:
        print(f"Error processing data: {str(e)}")
        return jsonify({"status": "error"}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
