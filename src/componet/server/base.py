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


@app.route('/api/login', methods=["POST"])
def listalarm():
    data =  request.get_json()
    username = data['username']
    password = data['password']
    keylogin = data['keylogin']
    user = pd.DataFrame(user_colection.find({'username':username, 'password':password, 'key':keylogin}))
    if len(user)==1:
        return json.dumps({'res':True})

    else:
        return json.dumps({'res':False,'msg':'اطلاعات وارد شده صحیح نیست'})


if __name__ == '__main__':
   app.run(debug=True)