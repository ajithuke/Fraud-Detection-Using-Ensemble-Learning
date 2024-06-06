from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.linear_model import LinearRegression
import numpy as np

app = Flask(__name__)
CORS(app)  # Allow CORS for the /predict endpoint

# Create a temporary model
model = LinearRegression()
X_train = np.array([[1], [2], [3], [4], [5]])
y_train = np.array([1, 2, 3, 4, 5])
model.fit(X_train, y_train)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print("Received data:", data)  # Debug line
    try:
        feature = float(data['feature'])  # Convert the 'feature' to a float
    except ValueError:
        return jsonify({'error': 'Invalid input. Feature must be numeric.'}), 400
    
    # Reshape the feature to ensure it's a 2D array
    feature_reshaped = np.array([[feature]])
    prediction = model.predict(feature_reshaped)[0]
    print("Prediction:", prediction)  # Debug line
    return jsonify({'prediction': prediction})


if __name__ == '__main__':
    app.run(debug=True)
