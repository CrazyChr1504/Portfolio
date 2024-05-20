import random
import os
import requests
import datetime
import json
from dotenv import load_dotenv
from flask import Flask, jsonify, request

app = Flask(__name__)
load_dotenv()
API_KEY = os.getenv("API_KEY")

@app.route("/")
def welcome():
    string = "Hello User"
    return string

@app.route("/random_number")
def random_num():
    return jsonify(random.randint(0,100))

@app.route("/random_name")
def random_name():
    with open("/Random_Name.json", "r", encoding="utf-8") as f:
        names = json.load(f)
        return random.choice(names)

@app.route("/current_date")
def current_date():
    date = datetime.datetime.now()
    return jsonify(date)    

@app.route("/convert_currency")
def currency_converter():
    start_input = request.args.get('from')
    converted_input = request.args.get('to')
    amount = request.args.get('amount')
    if start_input == "USD" and converted_input == "SEK":
        converted_curr = float(amount)* 11.05
        string = f"{amount} {start_input} is {converted_curr} {converted_input}"
        return jsonify(string)
    else:
        return jsonify(f"We can't covert {start_input} to {converted_input}") 

@app.route("/weather")
def weather_now():
    city = request.args.get("city")
    req = requests.get(f"https://api.weatherbit.io/v2.0/current?key={API_KEY}&city={city}&include=minutely")
    res = req.json()
    string = f"The temp in {res["data"][0]["city_name"]} is {res["data"][0]["temp"]} C°"
    return string

@app.route("/daily-joke")
def joker():
    with open("/Joker.json", "r", encoding="utf-8") as f:
        jokes = json.load(f)
        return random.choice(jokes)

@app.route("/count-words")
def word_count():
    with open("/Random_Sentences.json", "r", encoding="utf-8") as f:
        sentences = json.load(f)
        sentence = random.choice(sentences)
        words = sentence.split(" ")
        count = len(words)
        string = f"There are {count} words in {sentence}"
        return jsonify(string)

@app.route("/is-palindrome")
def palindrome_check():
    word = request.args.get('word')
    word = word.lower()
    for i in range(0, int(len(word)/2)):
        if word[i] != word[len(word)-i-1]:
            return f"{word} is not a palindrome"
    return f"{word} is a palindrome"

@app.route("/countries")
def countries_data():
    with open("Countries_data.json", "r", encoding="utf-8") as f:
        countries = json.load(f)
        return jsonify(countries)

@app.route("/daily-horoscope")
def horoscope_data():
    with open("Horoscopes.json", "r", encoding="utf-8") as f:
        horoscopes = json.load(f)
        sign = request.args.get("sign")
        string = horoscopes[sign]
        return string
