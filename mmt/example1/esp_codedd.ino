// esp8266 code, for sending random sensor simulation data, and the actual realtime timestamp...

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

const char *ssid = "Data_ssuur";                                   // input ur network name
const char *password = "ttyyttyyY";                                // input ur network password
const char *serverUrl = "http://192.168.60.183:5000/receive_data"; // link of hosted flask server

// according to India, Kolkata standard time, its gmt is -5:30, so used formula...
const long utcOffsetInSeconds = (5 * 3600) + (30 * 60);
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);

void setup()
{
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }

    timeClient.begin();
}

void loop()
{
    timeClient.update();

    // Create a JSON string with both timestamp and random sensor data
    String currentTimeData = "{\"Timestamp\":\"" + timeClient.getFormattedTime() + "\", \"SensorValue\":" + String(random(0, 100)) + "}";

    WiFiClient client;
    HTTPClient http;

    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(currentTimeData);

    if (httpResponseCode > 0)
    {
        Serial.print("Data sent successfully! HTTP Response Code: ");
        Serial.println(httpResponseCode);
    }
    else
    {
        Serial.print("Failed to send data. HTTP Response Code: ");
        Serial.println(httpResponseCode);
    }

    http.end();

    // Wait for some time (5 seconds) before sending the next data
    delay(5000);
}
