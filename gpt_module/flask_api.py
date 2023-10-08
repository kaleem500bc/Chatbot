from gpt_module import GPT_MODULE
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from flask_cors import CORS

import yaml

with open("config.yaml", "r") as f:
    config = yaml.safe_load(f)

app = Flask(__name__)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = config["database_uri"]
config = config["gpt"]
db = SQLAlchemy(app)

gpt_module = GPT_MODULE()

class ChatbotHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_input = db.Column(db.String(2000))
    generated_text = db.Column(db.String(2000))

    def __init__(self, user_input, generated_text):
        self.user_input = user_input
        self.generated_text = generated_text

with app.app_context():
    db.create_all()

@app.route("/gpt", methods=["POST"])
def get_gpt_response():
    user_input = request.get_json()["input_text"]
    generated_text = gpt_module.generate_text(user_input)
    chatbot_history = ChatbotHistory(user_input, generated_text)
    db.session.add(chatbot_history)
    db.session.commit()
    return jsonify({"gpt_response": generated_text})

@app.route("/loadHistory", methods=["POST"])
def load_history():
    idx = request.get_json()["index"]
    entry = ChatbotHistory.query.order_by(desc(ChatbotHistory.id)).offset(idx-1).first()
    return jsonify({"history": entry.generated_text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port= config["port"])