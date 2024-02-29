$(document).ready(function () {
    function updateSensorValue() {
        $.ajax({
            url: '/get_latest_data',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // Update the content of the paragraph with both timestamp and sensor value
                // $('#sensorValue').text('Received data: Timestamp ' + data.Timestamp + ', Sensor Value ' + data.SensorValue);
                $('#sensorValue').text('Received data: Sensor value ' + data.SensorValue + '   Timestamp ' + data.Timestamp);

            },
            complete: function () {
                // Schedule the next update after a delay (e.g., 1000 milliseconds = 1 second)
                setTimeout(updateSensorValue, 1000);
            }
        });
    }

    // Start the update loop
    updateSensorValue();
});
