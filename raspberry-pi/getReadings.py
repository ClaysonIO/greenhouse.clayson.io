import Adafruit_DHT
import os
import datetime
import requests

readingTimeStampInMs = round(datetime.datetime.now().timestamp() * 1000)

DEVICE_ID = "margosGreenhouse"
SERVER = "https://greenhouse.clayson.io/.netlify"

def getTemperatureSensorValues():
    print("Getting Temperature Values")
    valueList = []

    subfolders = [ f.path for f in os.scandir("/sys/bus/w1/devices") if f.is_dir() ]

    for folder in subfolders:
        try:
            value = {"deviceId": DEVICE_ID, "sensorId": None, "type": "t", "value": None, "time": readingTimeStampInMs}

            with open(folder + "/name", 'r') as name:
                value["sensorId"] = name.readline().strip()

            with open(folder + "/temperature", 'r') as temperature:
                value["value"] = float(temperature.readline().strip()) / 1000

            if value["sensorId"] is not None and value["value"] is not None:
                valueList.append(value)

        except FileNotFoundError:
            print("")

    return valueList

def getDHTSensorValues():
    print("Getting DHT Values")
    valueList = []

    DHT_PIN = 17
    DHT_SENSOR = Adafruit_DHT.DHT22
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)

    valueList.append({"deviceId": DEVICE_ID, "sensorId": "DHT22_T", "type": "t", "value": temperature, "time": readingTimeStampInMs})
    valueList.append({"deviceId": DEVICE_ID, "sensorId": "DHT22_H", "type": "h", "value": humidity, "time": readingTimeStampInMs})
    return valueList


dhtReadings = getDHTSensorValues()
temperatureReadings = getTemperatureSensorValues()

readings = [*dhtReadings, *temperatureReadings]

for reading in readings:
    print(reading)

r = requests.post(SERVER + "/addReadings", json=readings)

print(r.status_code)
print("DONE")