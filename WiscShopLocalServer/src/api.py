#!/usr/bin/env python
from flask import Flask, request, jsonify, make_response, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json
import os
import uuid
from werkzeug.security import generate_password_hash
from dateutil.parser import parse as date_parse
from dateutil.tz import gettz
import datetime


from app import app
from tables import *
from activities import *
from applications import *
from categories import *
from database import db
from foodarchetypes import *
from foods import *
from meals import *
from messages import *
from models import *
from products import *
from reviews import *
from tables import *
from tags import *
from users import *
from util import *

tzinfo = gettz('America/Chicago')



def delete_empty_string_user():
    users = User.query.filter_by(username='').all()
    for user in users:
        db.session.delete(user)
    db.session.commit()

try:
    with open('class_data.json','r') as filedata:
            CLASS_DATA = json.load(filedata)
    with open('card_data.json','r') as filedata:
            CARD_DATA = json.load(filedata)
    with open('class_data_previous.json','r') as filedata:
            PREVIOUS_CLASS_DATA = json.load(filedata)
except Exception as e:
    print('Error loading json data: '+str(e))
    CLASS_DATA = {}
    CARD_DATA = {}
    PREVIOUS_CLASS_DATA = {}

@app.route('/students/5022025924/classes/completed/',methods=['GET'])
def get_completed():
    return create_response(PREVIOUS_CLASS_DATA,200,origin='*')

@app.route('/classes/',methods=['GET'])
def get_classes():
    return create_response(CLASS_DATA,200,'*')

@app.route('/cards/',methods=['GET'])
def get_cards():
    return create_response(CARD_DATA,200,'*')

@app.route('/')
def index():
    return create_response({'message':'Nothing here!'},200,'*')

@app.route('/teapot')
def teapot():
    return create_response({'message':"I'm a teapot"},418,'*')

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
