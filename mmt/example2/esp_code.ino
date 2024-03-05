#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <DHT.h>

const char *ssid = "Data_ssuur";
const char *password = "ttyyttyyY";
const char *serverUrl = "http://192.168.38.183:5000/receive_data";

const long utcOffsetInSeconds = (5 * 3600) + (30 * 60);
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);

#define DHTPIN 5      // Define the pin where the DHT11 sensor is connected
#define DHTTYPE DHT11 // Define the type of DHT sensor

DHT dht(DHTPIN, DHTTYPE);

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
    dht.begin();
}

void loop()
{
    timeClient.update();

    // Read humidity and temperature from DHT sensor
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();

    // Check if any reads failed and exit early (to try again).
    if (isnan(humidity) || isnan(temperature))
    {
        Serial.println("Failed to read from DHT sensor!");
        delay(2000);
        return;
    }

    // Create a JSON string with timestamp, humidity, and temperature data
    String currentTimeData = "{\"Timestamp\":\"" + timeClient.getFormattedTime() + "\", \"Humidity\":" + String(humidity) + ", \"Temperature\":" + String(temperature) + "}";

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

    // Wait for some time (e.g., 5 seconds) before sending the next data
    delay(5000);
}
