import time
from datetime import datetime
from datetime import timedelta
import sys
import pymongo
from random import *

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


timestamp = str(datetime.now()+timedelta(hours=1))
timestamp = timestamp[:-7]
d = datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S")

ahval = randint(20,95)
tempval = randint(10,50)

datatemp = {'tempval': tempval, 'tempdate':d, 'tempgeo':"48.078277212171514, 11.644345861438955"}
dataah = {'ahval': ahval, 'ahdate':d, 'ahgeo':"48.078277212171514, 11.644345861438955"}

dataout = {'tempval': str(tempval), 'ahval': str(ahval), 'date': str(d), 'geo': "48.078277212171514, 11.644345861438955"}

print(dataout, file=sys.stdout)

inserttemp(datatemp)
insertah(dataah)


