## Raspberry Pi Setup Instructions

This tool was setup to use two sensors -- a [DHT22 Humidity and Temperature sensor](https://www.amazon.com/Gowoops-Temperature-Humidity-Measurement-Raspberry/dp/B073F472JL/ref=asc_df_B073F472JL/?tag=bingshoppinga-20&linkCode=df0&hvadid=&hvpos=&hvnetw=o&hvrand=&hvpone=&hvptwo=&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=&hvtargid=pla-4584070137867581&psc=1)
and one or more [DS18B20 Waterproof Temperature Sensors](https://www.amazon.com/Eiechip-Waterproof-Temperature-Thermometer-Resistance/dp/B07MB1J43W/ref=sr_1_1_sspa?dchild=1&hvadid=77653128360992&hvbmt=be&hvdev=c&hvqmt=e&keywords=ds18b20+waterproof&qid=1597032649&sr=8-1-spons&tag=mh0b-20&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzMjU5UFhQSEIxTjQxJmVuY3J5cHRlZElkPUEwODk5OTI5R0dQNEEzMEhBQUdCJmVuY3J5cHRlZEFkSWQ9QTA2NDE4ODQxVkxXNklWNzIxNDNDJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==).

Many resources were used while identifying the necessary code. Top on the list are [Raspberry Pi Humidity Sensor using the DHT22](https://pimylifeup.com/raspberry-pi-humidity-sensor-dht22/) and [Set Up a Raspberry Pi DS18B20 Temperature Sensor](https://myhydropi.com/ds18b20-temperature-sensor-on-a-raspberry-pi).

Hardware Setup: 
* All DS18B20 temperature sensors should be plugged into GPIO4
* The DHT22 sensor should be plugged into GPIO17

Software Setup: 
* Log in to the Raspberry Pi
* To setup the DS18B20 Temperature Sensors: 
  * Type `sudo nano /boot/config.txt`
    * Add the following line to the bottom: `dtoverlay=w1-gpio`
* To setup the DHT 22 Humidity and Temperature Sensor
  * Type the following in order:
      * `sudo apt-get update`
      * `sudo apt-get upgrade`
      * `sudo apt-get install python3-dev python3-pip`
      * `sudo python3 -m pip install --upgrade pip setuptools wheel`
      * `sudo pip3 install Adafruit_DHT`
* To setup the recurring jobs: 
