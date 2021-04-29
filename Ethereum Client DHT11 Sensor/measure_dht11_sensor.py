import Adafruit_DHT
import time
from datetime import datetime
from datetime import timedelta
import sys
import pymongo

# Set sensor type : Options are DHT11,DHT22 or AM2302
sensor=Adafruit_DHT.DHT11

# Set GPIO sensor is connected to
gpio=4

connection = pymongo.MongoClient('mongodb+srv://IBES:IBES@emissions.f6abh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
database = connection['myFirstDatabase']
collectiontemp = database['temp2']
collectionah = database['ah2']

def inserttemp(data):
        document = collectiontemp.insert_one(data)
        return document.inserted_id

def insertah(data):
        document = collectionah.insert_one(data)
        return document.inserted_id


# Reading the DHT11 is very sensitive to timings and occasionally the Pi
# might fail to get a valid reading. So check if readings are valid.
timestamp = str(datetime.now()+timedelta(hours=1))
timestamp = timestamp[:-7]
d = datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S")

humidity, temperature = Adafruit_DHT.read_retry(sensor, gpio)

tempval = '{0:0.1f}'.format(temperature)
tempval = str(tempval)
tempval = tempval[0:tempval.find(".")]
tempval = int(tempval)
ahval = '{1:0.1f}'.format(temperature, humidity)
ahval = str(ahval)
ahval = ahval[0:ahval.find(".")]
ahval = int(ahval)

datatemp = {'tempval': tempval, 'tempdate':d, 'tempgeo':"48.078277212171514, 11.644345861438955"}
dataah = {'ahval': ahval, 'ahdate':d, 'ahgeo':"48.078277212171514, 11.644345861438955"}

dataout = {'tempval': str(tempval), 'ahval': str(ahval), 'date': str(d), 'geo': "48.078277212171514, 11.644345861438955"}

print(dataout, file=sys.stdout)

inserttemp(datatemp)
insertah(dataah)

