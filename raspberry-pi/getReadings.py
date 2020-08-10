import Adafruit_DHT
import os

DEVICE_ID = "margosGreenhouse"

def getTemperatureSensorValues():
    valueList = []

    subfolders = [ f.path for f in os.scandir("/sys/bus/w1/devices") if f.is_dir() ]

    for folder in subfolders:
        try:
            value = {"deviceId": DEVICE_ID, "sensorId": None, "type": "t", "value": None}

            with open(folder + "/name", 'r') as name:
                value["sensorId"] = name.readline()

            with open(folder + "/temperature", 'r') as temperature:
                value["value"] = temperature.readline()

            if value["sensorId"] is not None and value["value"] is not None:
                print("VALID!")
                print(value)
                valueList.append(value)

        except FileNotFoundError:
            print("File Not Found")
    return valueList

def getDHTSensorValues():
    valueList = []

    DHT_PIN = 17
    DHT_SENSOR = Adafruit_DHT.DHT22
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)

    valueList.append({"deviceId": DEVICE_ID, "sensorId": "DHT22_T", "type": "t", "value": temperature})
    valueList.append({"deviceId": DEVICE_ID, "sensorId": "DHT22_H", "type": "h", "value": humidity})
    return valueList


dhtReadings = getDHTSensorValues()
temperatureReadings = getTemperatureSensorValues()

readings = dhtReadings.extend(temperatureReadings)

print(readings)
print("DONE")