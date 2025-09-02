#include <WiFi.h>
#include <WebServer.h>
#include "DHT.h"

#define DHTPIN 5
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "MARIANALINDA";
const char* password = "ELYSALINDA";

WebServer server(80);

void handleRoot() {
  float temperatura = dht.readTemperature();
  float umidade = dht.readHumidity();

  if (isnan(temperatura) || isnan(umidade)) {
    server.send(500, "text/plain", "Erro ao ler sensor");
    return;
  }

  String json = "{";
  json += "\"temperatura\":" + String(temperatura, 1) + ",";
  json += "\"umidade\":" + String(umidade, 1);
  json += "}";

  server.send(200, "application/json", json);
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  WiFi.begin(ssid, password);
  Serial.print("Conectando ao WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado!");
  Serial.println("IP do ESP32: " + WiFi.localIP().toString());

  server.on("/", handleRoot);
  server.begin();
}

void loop() {
  server.handleClient();
}
