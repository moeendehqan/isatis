from flask import Flask, request, jsonify, Response
import pymongo
import pandas as pd
from flask_cors import CORS
from bson import ObjectId
import json

client = pymongo.MongoClient()
roundtrade_db = client['isatis']
user_colection = roundtrade_db['user']



app = Flask(__name__)
CORS(app)
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

@app.route('/api/login', methods=["POST"])
def login():
    data =  request.get_json()
    username = data['username']
    password = data['password']
    keylogin = data['keylogin']
    user = pd.DataFrame(user_colection.find({'username':username, 'password':password, 'key':keylogin}))
    if len(user)==1:
        return json.dumps({'res':True})

    else:
        return json.dumps({'res':False,'msg':'اطلاعات وارد شده صحیح نیست'})


@app.route('/api/userfromsymbol', methods=["POST"])
def userfromsymbol():
    data =  request.get_json()
    username = data['username']
    user = pd.DataFrame(user_colection.find({'username':username}))
    if len(user)==1:
        symbol = user['symbol'][user.index.max()]
        return json.dumps({'res':True, 'symbol':symbol})

    else:
        return json.dumps({'res':False,'msg':'نام کاربری یافت نشد'})


@app.route('/api/getfile', methods=["POST"])
def getfile():
    data =  request.files['file']
    print(data.filename)
    return json.dumps({'res':False,'msg':data.filename})


if __name__ == '__main__':
   app.run(debug=True)