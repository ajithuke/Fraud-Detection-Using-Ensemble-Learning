from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle

app = Flask(__name__)
CORS(app)  # Allow CORS for the /predict endpoint

# Load the model
with open(r'C:\Users\Ajit\Documents\Fraud Detection\transact\ensemble_model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print("Received data:", data)  # Debug line
    
    try:
        # Extract the features and convert them to a list of floats
        feature_list = [float(value) for value in data['feature'].split(',')]
    except ValueError:
        return jsonify({'error': 'Invalid input. All features must be numeric.'}), 400
    
    # Reshape the feature list to ensure it's a 2D array
    feature_reshaped = np.array([feature_list])
    
    # Make a prediction using the model
    prediction = model.predict(feature_reshaped)[0]
    
    # Convert numpy boolean to native Python boolean
    if isinstance(prediction, np.bool_):
        prediction = bool(prediction)
    
    print("Prediction:", prediction)  # Debug line
    
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
