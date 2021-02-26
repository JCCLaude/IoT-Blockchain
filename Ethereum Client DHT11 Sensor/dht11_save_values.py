import Adafruit_DHT
import time
from datetime import datetime

# Set sensor type : Options are DHT11,DHT22 or AM2302
sensor=Adafruit_DHT.DHT11

# Set GPIO sensor is connected to
gpio=4

file = open("values.txt","a")
Data = ""

timestamp = datetime.now()

# Reading the DHT11 is very sensitive to timings and occasionally the Pi
# might fail to get a valid reading. So check if readings are valid.
while (True):
               timestamp = datetime.now()
               humidity, temperature = Adafruit_DHT.read_retry(sensor, gpio)
               Data = 'Temp={0:0.1f}*C , Humidity={1:0.1f}%'.format(temperat$
               if(humidity < 100.1 and humidity > -0.1):
                file.write(Data)
                file.flush()
                time.sleep(3)
