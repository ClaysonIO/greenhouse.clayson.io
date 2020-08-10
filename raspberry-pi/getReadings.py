import Adafruit_DHT
import os

DEVICE_ID = "margosGreenhouse"
DHT_PIN = 17

subfolders = [ f.path for f in os.scandir("/sys/bus/w1/devices") if f.is_dir() ]

for folder in subfolders:
    print(folder)

    try:
        temp = open(folder + "/temperature")
        print(temp.readlines())
    except FileNotFoundError:
        print("File Not Found")
    finally:
        temp.close()

def getDHTSensorValues(PIN):
    DHT_SENSOR = Adafruit_DHT.DHT22
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, PIN)
    return humidity, temperature

print("DONE")
