$(document).ready(function () {
    function updateSensorValue() {
        $.ajax({
            url: '/get_latest_data',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // Update the content of the paragraph with humidity, temperature, and timestamp
                $('#sensorValue').text('Received data: Humidity ' + data.Humidity + '%, Temperature ' + data.Temperature + '°C, Timestamp ' + data.Timestamp);
            },
            complete: function () {
                // Schedule the next update after a delay (e.g., 1000 milliseconds = 1 second)
                setTimeout(updateSensorValue, 5000);
            }
        });
    }

    // Start the update loop
    updateSensorValue();
});