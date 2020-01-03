#!/usr/bin/python3
from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import sys
import ssl
#import paho.mqtt.client as mqtt
#import paho.mqtt.subscribe as subscribe
import json
import logging, traceback
import pymysql
import datetime
import sched, time
import threading
import time

conn = pymysql.connect(
    host='water-db.c8iptqv0aosa.ap-south-1.rds.amazonaws.com',
    user='admin',
    password='admin123',
    database='water'
)
conn.autocommit(True)
app = Flask(__name__)
cors=CORS(app,resources={r'/*':{'origins':'*'}})
cog = boto3.client('cognito-idp', region_name='ap-south-1')
cogcli='2u1lch909cct1h3sftf1k9te2a'
@app.route('/signup',methods=['GET', 'POST'])
def signup():
    try:
        print('Entered')
        content = json.loads(request.data)
        email = str(content['email'])
        x=0
        cogcli='2u1lch909cct1h3sftf1k9te2a'
        if(email.rfind("srmist.edu.in")!=-1):
            cog.sign_up(
                ClientId = cogcli,
                Username = content['username'],
                Password = content['password'],
                UserAttributes=[{'Name':'email','Value':content['email']}]
            )
            x=1
    except cog.exceptions.UsernameExistsException:
        return 'Username Already Exists!'
    except Exception as e:
        print('Exception: ' +str(e))
        return str(e)
    if(x==1):
        return 'True'
    else:return 'False'

@app.route('/login', methods=['GET', 'POST'])
def login():
    try:
        print(request.data)
        content = json.loads(request.data)
        print(content)

        auth = cog.initiate_auth(
                AuthFlow = 'USER_PASSWORD_AUTH',
                AuthParameters = {
                        'USERNAME': content['username'],
                        'PASSWORD': content['password']
                },
                        ClientId = cogcli
        )
        return json.dumps(auth['AuthenticationResult'])
    except cog.exceptions.UserNotConfirmedException:
        return 'User is not confirmed. Please check your mail.'
    except cog.exceptions.UserNotFoundException:
        return 'User does not exist. Check again.'
    except cog.exceptions.NotAuthorizedException:
        return 'Username/Password is incorrect'
    except Exception as e:
        print(e)
        return str(e)

def dtSerializer(obj):
     if isinstance(obj, datetime.datetime):
             return(obj.isoformat())
     else:
             TypeError('Unknown serializer')
@app.route('/logout', methods=["GET", "POST"])
def logout():
    try:
        content = json.loads(request.data)
        cog.global_sign_out(AccessToken=content['AccessToken'])
        return "true"
    except Exception as e:
        print(e)
        return "true"
@app.route('/getDetails', methods=['GET', 'POST'])
def getDetails():
        content = json.loads(request.data)
        #fromDate = content['from']
        #toDate = content['to']
        with conn.cursor(pymysql.cursors.DictCursor) as cur:
                #cur.execute('SELECT flow,tnd from water where Total IS NULL ')
                #x=cur.fetchone()
                #y=float(x['flow'])
                #z=y/60
                #flow_total=round(z,1)
                #cur.execute('update water set total="'+str(flow_total)+'" where tnd="'+str(x['tnd'])+'"')
                #cur.execute('update water set total1=''+str(flow_total)+'' where tnd= ''+ str(x['tnd']) +'' ')
                #cur.execute('SELECT flow from water where created_at=''+ x['created_at'] +'' ')
                #z=cur.fetchone()
                total={"total":0}
                #cur.execute('SELECT tap_id,sum(Total) total from water.water where tnd >="'+str(content['from'])+'" and tnd<="'+str(content['to'])+'" ')
                cur.execute('SELECT Floor,water.tap_id,sum(Total) total from water.water JOIN water.water1 on(water.tap_id=water1.tap_id) where Floor= "'+ content['Floor']+ '" AND Building= "'+  content['Building']+ '" AND tnd >="' + str(content['from']) + '" AND tnd<="' + str(content['to']) + '" group by tap_id')
                if cur.rowcount!=0:
                        total= cur.fetchall()
                #cur.execute('UPDATE  INTO water2 SET total1=  where tap_id=''+y['tap_id ']+'' AND created_at=''+z+'' ')

        payload = {
        'Total':total
        }
        return json.dumps(payload,default=dtSerializer)
@app.route('/buildpage',methods=['GET','POST'])
def buildpage():
        content=json.loads(request.data)
        total={"total":0}
        with conn.cursor(pymysql.cursors.DictCursor) as cur:
                cur.execute('select Building,sum(Total) total from water.water JOIN water.water1 on(water.tap_id=water1.tap_id) where tnd>="'+str(content['from'])+'" AND tnd<="'+str(content['to'])+'"group by Building')
                if cur.rowcount!=0:
                        total=cur.fetchall()
        payload={
        'Total':total
        }
        return json.dumps(payload,default=dtSerializer)
@app.route('/secpage',methods=['GET','POST'])
def secpage():
        content=json.loads(request.data)
        total={"total":0}
        with conn.cursor(pymysql.cursors.DictCursor) as cur:
                cur.execute('select Building,Floor,sum(Total) total from water.water JOIN water.water1 on(water.tap_id=water1.tap_id) where tnd>="'+str(content['from'])+'" AND tnd<="'+str(content['to'])+'"AND Building="'+content['Building']+'" group by Building,Floor')
                if cur.rowcount!=0:
                        total=cur.fetchall()
        payload={
        'Total':total
        }
        return json.dumps(payload,default=dtSerializer)
@app.route('/dropbuild',methods=['GET','POST'])
def dropbuild():
        with conn.cursor(pymysql.cursors.DictCursor) as cur:
                cur.execute('select distinct Building from water.water1')
                x=cur.fetchall()
        payload={'Building':x}
        return json.dumps(payload,default=dtSerializer)
@app.route('/dropfloor',methods=['GET','POST'])
def dropfloor():
        content=json.loads(request.data)
        with conn.cursor(pymysql.cursors.DictCursor) as cur:
                cur.execute('select Floor from water.water1 where Building="'+str(content['Building'])+'"')
                x=cur.fetchall()
        payload={'Floor':x}
        return json.dumps(payload,default=dtSerializer)
@app.route('/complaint',methods=['GET','POST'])
def complaint():
        with conn.cursor(pymysql.cursors.DictCursor) as cur:
                cur.execute('select * from water.water2')
                x=cur.fetchall()
        payload = {'Complaints':x}
        #cur.close()
        return json.dumps(payload,default=dtSerializer)
@app.route('/inscomplaint',methods=['GET','POST'])
def inscomplaint():
        content = json.loads(request.data)
        with conn.cursor(pymysql.cursors.DictCursor) as cur:
                cur.execute('insert into water.water2(Building,Floor,location,Complaint) values ("'+str(content['Building'])+'","'+str(content['Floor'])+'","'+str(content['location'])+'","'+str(content['Complaint'])+'")')
                #cur.execute('select * from water.water2')
                #x=cur.fetchall()
        #payload = {'Complaints':''}
        #return json.dumps(payload,default=dtSerializer)
@app.route('/delcomplaint',methods=['GET','POST'])
def delcomplaint():
        content = json.loads(request.data)
        if(content['username']=="management"):
                with conn.cursor(pymysql.cursors.DictCursor) as cur:
                        cur.execute('delete from water.water2 where Building="'+str(content['Building'])+'" and Floor= "'+str(content['Floor'])+'" and location="'+str(content['location'])+'" and Complaint="'+str(content['Complaint'])+'"')
                        #cur.execute('select * from water.water2')
                        #x=cur.fetchall()
                payload={'Complaints':'1'}
                return json.dumps(payload,default=dtSerializer)
        else:
                payload={'Complaints':'0'}
                return json.dumps(payload,default=dtSerializer)
@app.route('/filter',methods=['GET','POST'])
def filter():
        content=json.loads(request.data)
        with conn.cursor(pymysql.cursors.DictCursor) as cur:
                cur.execute('select Building,Floor,location,Complaint from water.water2 where Building="'+str(content['Building'])+'"')
                x=cur.fetchall()
        payload = {'filter':x}
        return json.dumps(payload,default=dtSerializer)
@app.route('/building',methods=['GET','POST'])
def building():
        #content=json.loads(request.data)
        with conn.cursor(pymysql.cursors.DictCursor) as cur:
                cur.execute('select Building from water.water2 group by Building')
                x=cur.fetchall()
        payload = {'Building':x}
        return json.dumps(payload,default=dtSerializer)
if __name__ == '__main__':
        app.run(host='0.0.0.0', debug=True)
