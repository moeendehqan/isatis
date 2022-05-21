from flask import Flask, request, jsonify, Response
import pymongo
import pandas as pd
from flask_cors import CORS, cross_origin
from bson import ObjectId
import json
import fnc
import numpy as np

client = pymongo.MongoClient()
roundtrade_db = client['isatis']
user_colection = roundtrade_db['user']



app = Flask(__name__)
CORS(app)


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
    balance_collection = symbol_db['balance']

    TradeType = Trade.filename.split('.')[-1]
    RegisterType = Register.filename.split('.')[-1]

    if TradeType == 'xlsx':
        dfTrade = pd.read_excel(Trade)
    elif TradeType == 'csv':
        dfTrade = pd.read_csv(Trade, encoding='utf-16', sep='\t')
    else:
        return json.dumps({'res':False,'msg':'نوع فایل معاملات مجاز نیست'})

    if RegisterType == 'xlsx':
        dfRegister = pd.read_excel(Register)
    elif RegisterType == 'csv':
        dfRegister = pd.read_csv(Register, encoding='utf-16', sep='\t')
    else:
        return json.dumps({'res':False,'msg':'نوع فایل رجیستر مجاز نیست'})

    if fnc.is_trade_file(dfTrade)==False:
        if symbol not in dfTrade['Symbol']:
            if dfTrade['Date'].max() != dfTrade['Date'].min():
                return json.dumps({'res':False,'msg':'محتویات فایل معاملات صحیح نیست'})
    if fnc.is_register_file(dfRegister)==False:
        return json.dumps({'res':False,'msg':'محتویات فایل رجیستر صحیح نیست'})

    cl_trade = pd.DataFrame(trade_collection.find({'Date':int(dfTrade['Date'].max())}))
    if len(cl_trade)>0:
        trade_collection.delete_many({'Date':int(dfTrade['Date'].max())})
        
    trade_collection.insert_many(dfTrade.to_dict(orient='records'))


    cl_register = pd.DataFrame(register_collection.find())
    if len(cl_register)>0:
        cl_register = cl_register.drop(columns='_id')
    dfRegister = dfRegister.append(cl_register)
    dfRegister = dfRegister.drop_duplicates(subset=['Account'])
    register_collection.drop()
    register_collection.insert_many(dfRegister.to_dict(orient='records'))


    cl_balance = pd.DataFrame(balance_collection.find({'Date':int(dfTrade['Date'].max())}))
    if len(cl_balance)>0:
        balance_collection.delete_many({'Date':int(dfTrade['date'].max())})
    blnc_buy =  dfTrade.groupby('B_account').sum()
    blnc_sel =  dfTrade.groupby('S_account').sum()
    blnc_buy = blnc_buy.reset_index()[['B_account','Volume']]
    blnc_buy = blnc_buy.set_index('B_account')
    blnc_sel = blnc_sel.reset_index()[['S_account','Volume']]
    blnc_sel = blnc_sel.set_index('S_account')
    dfBalance = blnc_buy.join(blnc_sel, lsuffix='_B',rsuffix= '_S', how='outer')
    dfBalance = dfBalance.reset_index()
    dfBalance['date'] = dfTrade['Date'].max()
    dfBalance = dfBalance.replace(np.nan, 0)
    dfBalance['Balance'] = dfBalance['Volume_B'] - dfBalance['Volume_S']
    balance_collection.insert_many(dfBalance.to_dict(orient='records'))

    return json.dumps({'res':True,'msg':'اطلاعات با موفقیت ثبت شد'})


@app.route('/api/alldate', methods=["POST"])
def alldate():
    data =  request.get_json()
    user = data['username']
    symbol = pd.DataFrame(user_colection.find({'username':user}))
    symbol = symbol['symbol'][symbol.index.max()]
    symbol_db = client[f'{symbol}_db']
    trade_collection = symbol_db['trade']
    dftrade = pd.DataFrame(trade_collection.find({}))
    alldate = list((set(dftrade['Date'].to_list())))
    return json.dumps({'res':True,'result':alldate})

@app.route('/api/traderreport', methods=["POST"])
def traderreport():
    data =  request.get_json()
    user = data['username']
    date = int(data['date'])
    side = data['side']


    if side:
        side = 'B_account'
    else:
        side = 'S_account'

    symbol = pd.DataFrame(user_colection.find({'username':user}))
    symbol = symbol['symbol'][symbol.index.max()]
    symbol_db = client[f'{symbol}_db']
    trade_collection = symbol_db['trade']
    dftrade = pd.DataFrame(trade_collection.find({'Date':date}))
    print(dftrade)
    dftrade['Value'] = dftrade['Volume'] * dftrade['Price']
    if len(dftrade)<=0:
        return json.dumps({'res':False})
    else:
        dfside = dftrade.groupby(by=[side]).sum()
        dfside = dfside[['Volume','Value']]
        dfside['Price'] = dfside['Value']/dfside['Volume']
        dfside['code'] = dfside.index
        dfside.index = [fnc.CodeToName(x,symbol) for x in dfside.index]
        dfside = dfside.sort_values(by=['Volume'],ascending=False)
        dfside = dfside.reset_index()
        dfside = dfside.reset_index()
        dfside = dfside[dfside.index<10]
        dfside.columns = ['id','name','volume','value','price','code']
        dffinall = pd.DataFrame()
        dffinall['value'] = dfside['value']
        dffinall['price'] = dfside['price']
        dffinall['volume'] = dfside['volume']
        dffinall['name'] = dfside['name']
        dffinall['id'] = dfside['id']
        dffinall['code'] = dfside['code']
        dffinall['w'] = (dffinall['volume']/dffinall['volume'].max())
        dffinall['price'] = [round(x) for x in dffinall['price']]
        print(dffinall)
        dffinall = dffinall.to_dict('records')
        return json.dumps({'res':True,'result':dffinall})



@app.route('/api/detailscode', methods=["POST"])
def detailscode():
    data =  request.get_json()
    user = data['username']
    code = data['code']
    symbol = pd.DataFrame(user_colection.find({'username':user}))
    symbol = symbol['symbol'][symbol.index.max()]
    symbol_db = client[f'{symbol}_db']
    register_collection = symbol_db['register']
    dfRegister = pd.DataFrame(register_collection.find({'Account':code})).drop(columns='_id')
    dfRegister = dfRegister.replace(np.nan,'')
    if len(dfRegister)>0:
        dfRegister = dfRegister.to_dict(orient='records')[0]
        return json.dumps({'res':True,'result':dfRegister})
    else:
        return json.dumps({'res':False,'result':''})

@app.route('/api/historycode', methods=["POST"])
def historycode():
    data =  request.get_json()
    user = data['username']
    code = data['code']
    symbol = pd.DataFrame(user_colection.find({'username':user}))
    symbol = symbol['symbol'][symbol.index.max()]
    symbol_db = client[f'{symbol}_db']
    balance_collection = symbol_db['balance']
    trade_collection = symbol_db['trade']
    alldatetrade = pd.DataFrame(trade_collection.find({}))
    alldatetrade = list(set(alldatetrade['Date'].to_list()))
    dfBalance = pd.DataFrame(balance_collection.find({'index':code})).drop(columns=['_id','Volume_B','Volume_S','index'])
    alldatetrade = list(filter(lambda x : x >= dfBalance['date'].min() , alldatetrade))
    alldatetrade = list(filter(lambda x : x <= dfBalance['date'].max() , alldatetrade))
    for i in alldatetrade:
        if i not in list(dfBalance['date']):
            dfBalance.loc[dfBalance.index.max()+1]=[i,0]
    dfBalance = dfBalance.sort_values(by='date').reset_index().drop(columns=['index'])
    dfBalance['cum'] = dfBalance['Balance'].cumsum()
    dfBalance['ww'] = dfBalance['cum']/(max([abs(x) for x in dfBalance['cum']]))
    dfBalance = dfBalance.drop(columns=['Balance'])
    dfBalance = dfBalance.to_dict(orient='records')
    return json.dumps({'res':True,'result':dfBalance})




if __name__ == '__main__':
   app.run(debug=True)