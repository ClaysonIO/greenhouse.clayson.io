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

def getTemperatureSensorIds():
    print("Getting Temperature IDs")
    valueList = []

    subfolders = [ f.path for f in os.scandir("/sys/bus/w1/devices") if f.is_dir() ]

    for folder in subfolders:
        try:
            with open(folder + "/name", 'r') as name:
                value = name.readline().strip()
                if value is not None:
                    valueList.append({"sensorId": value, "type": "t"})

        except FileNotFoundError:
            print("")

    return valueList

def getDHTSensorIds():
    print("Getting DHT IDs")
    valueList = []

    DHT_PIN = 17
    DHT_SENSOR = Adafruit_DHT.DHT22
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)

    if humidity is not None and temperature is not None:
        valueList.append({"sensorId": "DHT22_H", "type": "h"})
        valueList.append({"sensorId": "DHT22_T", "type": "t"})

    return valueList

DEVICE_ID = getRaspberryPiSerial()

dhtSensors = getDHTSensorIds()
temperatureSensors = getTemperatureSensorIds()

deviceObject = {
    "deviceId": DEVICE_ID,
    "sensors": [*dhtSensors, *temperatureSensors]
}

print(deviceObject)

r = requests.post(SERVER + "/registerSensors", json=deviceObject)

print(r.status_code)
print("DONE")