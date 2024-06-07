from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle

app = Flask(__name__)
CORS(app)

# Load the model
with open(r'C:\Users\Ajit\Documents\Fraud Detection\transact\ensemble_model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print("Received data:", data) # Debug line
    
    try:
        feature_list = [float(value) for value in data['feature'].split(',')]
    except ValueError:
        return jsonify({'error': 'Invalid input. All features must be numeric.'}), 400
    
    feature_reshaped = np.array([feature_list])
    
    prediction = model.predict(feature_reshaped)[0]
    
    if isinstance(prediction, np.bool_):
        prediction = bool(prediction)
        
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
