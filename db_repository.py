import requests
import json
from pprint import pprint
from orator import DatabaseManager, Model

check = 0
config = {
    'mysql': {
        'driver': 'mysql',
        'host': 'localhost',
        'database': 'wzdb',
        'user': 'devs',
        'password': 'atobot2013',
        'prefix': ''
    }
}
db = DatabaseManager(config)
Model.set_connection_resolver(db)

class dbModel(Model):

    __table__ = 'models'



def get_json_data():
    global check,json_res
    if check == 0:
        check = 1
        url = "http://learnsteam.kr/dn/apps/atossam_modelins.json"
        res = requests.get(url=url)
        json_res = res.json()
    return json_res

def get_modelins():
    dbmodels = dbModel.all()
    return dbmodels

def load_db():
    json_data = get_json_data()
    for i in json_data["projects"]:
        dbmodel = dbModel()
        dbmodel.ext = i["ext"]
        dbmodel.level = i["level"]
        dbmodel.title = i["title"]
        dbmodel.id = i["id"]
        dbmodel.url = i["url"]
        dbmodel.prefix = i["prefix"]
        dbmodel.start = int(i["start"])
        dbmodel.end = int(i["end"])
        dbmodel.save()
    return 0

def get_modelinfo(id):
    dbmodels = get_modelins()
    for dbmodel in dbmodels:
        if dbmodel.id == id:
            return dbmodel
    return "none found"
