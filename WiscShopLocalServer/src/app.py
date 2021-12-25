#!/usr/bin/env python

from flask import Flask, request, jsonify, make_response, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = '12345'
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cs571.db'
app.url_map.strict_slashes = False
CORS(app)
