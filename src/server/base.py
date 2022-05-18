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
    Trade =  request.files['Trade']
    Register =  request.files['Register']
    user = request.form['user']

    symbol = pd.DataFrame(user_colection.find({'username':user}))
    symbol = symbol['symbol'][symbol.index.max()]
    symbol_db = client[f'{symbol}_db']

    trade_collection = symbol_db['trade']
    register_collection = symbol_db['register']

    TradeType = Trade.filename.split('.')[-1]
    RegisterType = Register.filename.split('.')[-1]

    if TradeType == 'xlsx':
        dfTrade = pd.read_excel(Trade)
    elif TradeType == 'csv':
        dfTrade = pd.read_csv(Trade)
    else:
        return json.dumps({'res':False,'msg':'نوع فایل معاملات مجاز نیست'})

    if RegisterType == 'xlsx':
        dfRegister = pd.read_excel(Register)
    elif RegisterType == 'csv':
        dfRegister = pd.read_csv(Register)
    else:
        return json.dumps({'res':False,'msg':'نوع فایل رجیستر مجاز نیست'})

    


    dfTrade = dfTrade.to_dict(orient='records')
    dfRegister = dfRegister.to_dict(orient='records')

    trade_collection.insert_many(dfTrade)
    register_collection.insert_many(dfRegister)
    return json.dumps({'res':False,'msg':'رسید و ثبت شد'})

if __name__ == '__main__':
   app.run(debug=True)