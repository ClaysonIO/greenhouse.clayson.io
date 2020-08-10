import Adafruit_DHT
import os
import datetime
import requests

readingTimeStampInMs = round(datetime.datetime.now().timestamp() * 1000)

SERVER = "https://greenhouse.clayson.io/.netlify/functions"

def getRaspberryPiSerial():
  # Extract serial from cpuinfo file
  cpuserial = "0000000000000000"
  try:
    f = open('/proc/cpuinfo','r')
    for line in f:
      if line[0:6]=='Serial':
        cpuserial = line[10:26]
    f.close()
  except:
    cpuserial = "ERROR000000000"

  return cpuserial

def getTemperatureSensorValues(deviceId):
    print("Getting Temperature Values")
    valueList = []

    subfolders = [ f.path for f in os.scandir("/sys/bus/w1/devices") if f.is_dir() ]

    for folder in subfolders:
        try:
            value = {"deviceId": deviceId, "sensorId": None, "type": "t", "value": None, "time": readingTimeStampInMs}

            with open(folder + "/name", 'r') as name:
                value["sensorId"] = name.readline().strip()

            with open(folder + "/temperature", 'r') as temperature:
                value["value"] = float(temperature.readline().strip()) / 1000

            if value["sensorId"] is not None and value["value"] is not None:
                valueList.append(value)

        except FileNotFoundError:
            print("")

    return valueList

def getDHTSensorValues(deviceId):
    print("Getting DHT Values")
    valueList = []

    DHT_PIN = 17
    DHT_SENSOR = Adafruit_DHT.DHT22
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)

    valueList.append({"deviceId": deviceId, "sensorId": "DHT22_T", "type": "t", "value": temperature, "time": readingTimeStampInMs})
    valueList.append({"deviceId": deviceId, "sensorId": "DHT22_H", "type": "h", "value": humidity, "time": readingTimeStampInMs})
    return valueList

DEVICE_ID = getRaspberryPiSerial()

dhtReadings = getDHTSensorValues(DEVICE_ID)
temperatureReadings = getTemperatureSensorValues(DEVICE_ID)

readings = [*dhtReadings, *temperatureReadings]

for reading in readings:
    print(reading)

r = requests.post(SERVER + "/addReadings", json=readings)

print(r.status_code)
print("DONE")