from flask import Flask, jsonify, request
from estimateBusy2 import predict, train_model
from flask_cors import CORS
import os
import numpy as np

app = Flask(__name__)
CORS(app)

model = train_model()

# Initialize globalpred to avoid uninitialized variable error
globalpred = None

@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route('/postmodel', methods=['POST'])
def get_model():
    global globalpred
    try:    
        if request.method == 'POST':
            # Use get_json to parse the incoming JSON request
            data = request.get_json()

            dt = data.get("date")
            time = data.get("time")
            datelist = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    
            tm = time.split(":")

            # Convert the date and time to minutes and get the prediction
            comb = (datelist.index(dt)) * 24 * 60 + int(tm[0]) * 60 + int(tm[1])
            comb = int(comb)
            print(f"yo {comb}")
            pred = predict(comb, model)

            # Store the prediction in the global variable
            globalpred = pred

            print(f"Prediction: {pred} for {dt} at {time}")
            
            pred = pred.flatten()[0]
            return jsonify({"prediction": int(pred)})

    except Exception as e:
        print("Error updating: ", e)

# Run the app on port 5000
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
