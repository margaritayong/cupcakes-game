#include <PubSubClient.h>
#include <ESP8266WiFi.h>

// connect to wifi
const char* ssid = "applemaca";
const char* password = "applemaca1989";

char* topic = "targetGoal";
char* server = "172.20.10.5";

// receive data from MQTT
int inByte = 0;         // incoming serial byte
String inputString = "";         // a String to hold incoming data
boolean stringComplete = false;  // whether the string is complete

//RGB LED pins
int ledPin[] = {13, 12, 14}; //the three digital pins of the digital LED 
                         //11 = redPin, 10 = bluePin, 9 = greenPin

const boolean ON = LOW;     //Define on as LOW (this is because we use a common 
                            //Anode RGB LED (common pin is connected to +5 volts)
const boolean OFF = HIGH;   //Define off as HIGH

//Predefined Colors
boolean RED[] = {ON, OFF, OFF};    
boolean GREEN[] = {OFF, ON, OFF}; 
boolean BLUE[] = {OFF, OFF, ON}; 
boolean YELLOW[] = {ON, ON, OFF}; 
boolean CYAN[] = {OFF, ON, ON}; 
boolean MAGENTA[] = {ON, OFF, ON}; 
boolean WHITE[] = {ON, ON, ON}; 
boolean BLACK[] = {OFF, OFF, OFF}; 

//An Array that stores the predefined colors
const boolean* COLORS[] = {RED, GREEN, BLUE, YELLOW, CYAN, MAGENTA, WHITE, BLACK};

WiFiClient wifiClient;

int targetSet = 0;
int totalCount = 100;

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");

  String myMessage = "";

  for (int i = 0; i < length; i++) {
    //Serial.print((char)payload[i]);

    myMessage += (char)payload[i];
  }


  if (myMessage == "no time") {
    setColor(ledPin, MAGENTA);    //Set the color of LED one
  }
  Serial.println(myMessage);
  Serial.println();
}

PubSubClient client(server, 1883, callback, wifiClient);

String macToStr(const uint8_t* mac)
{
  String result;
  for (int i = 0; i < 6; ++i) {
    result += String(mac[i], 16);
    if (i < 5)
      result += ':';
  }
  return result;
}

void setup() {
  Serial.begin(115200);
  delay(10);

//  pinMode(redPin, OUTPUT);
//  pinMode(greenPin, OUTPUT);
//  pinMode(bluePin, OUTPUT);

  for(int i = 0; i < 3; i++){
   pinMode(ledPin[i], OUTPUT);   //Set the three LED pins as outputs
  }
  
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // Generate client name based on MAC address and last 8 bits of microsecond counter
  String clientName;
  clientName += "esp8266-";
  uint8_t mac[6];
  WiFi.macAddress(mac);
  clientName += macToStr(mac);
  clientName += "-";
  clientName += String(micros() & 0xff, 16);

  Serial.print("Connecting to ");
  Serial.print(server);
  Serial.print(" as ");
  Serial.println(clientName);
  
  if (client.connect("piggybank")) {
    Serial.println("Connected to MQTT broker");
    Serial.print("Topic is: ");
    Serial.println(topic);
    client.subscribe(topic);
    
  }
  else {
    Serial.println("MQTT connect failed");
    Serial.println("Will reset and try again...");
    abort();
  }
}

void loop() {

  setColor(ledPin, WHITE); 

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  setTargetGoal();
}

void setTargetGoal() {
  targetSet = inByte;

  if (targetSet == totalCount) {
    setColor(ledPin, RED);
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");


    // Attempt to connect
    if (client.connect("piggybank")) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("outTopic", "hello world");
      // ... and resubscribe
      client.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

 
void setColor(int* led, boolean* color) {
  for(int i = 0; i < 3; i++){
    digitalWrite(led[i], color[i]);
  }
}
