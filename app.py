from flask import Flask, render_template, request
import pymysql
import db_repository
import img_obj, img_obj_controller
from orator import DatabaseManager, Model   

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

dbmodels = dbModel.all()
dbmodel = dbModel.find(1)


#flask 객체 인스턴스 생성
app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')  #접속하는 URL
def index():
    dbmodels =db_repository.get_modelins()
    return render_template('index.html',dbmodels = dbmodels)

@app.route('/info/<id>')
def info(id):
    # mid = request.path
    # print(mid)
    # mid = mid[6:]
    dbmodel = db_repository.get_modelinfo(id)
    iolist = img_obj_controller.generate_io(dbmodel.url,dbmodel.prefix,dbmodel.ext,dbmodel.start,dbmodel.end)
    urllist__ = img_obj_controller.generate_urllist(iolist)
    return render_template('info.html',urllist =urllist__)
    



if __name__ =="__main__":
    print(">>>")
    app.run(debug=True)
#host등을 직접 적용하고 싶다면 
#app.run(host="127.0.0.1",port="5000",debug=True)
