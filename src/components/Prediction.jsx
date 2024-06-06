// src/PredictionForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PredictionForm = () => {
    const [input, setInput] = useState('');
    const [prediction, setPrediction] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', { feature: input });
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">Predict</button>
            </form>

            {prediction && <p>Prediction: {prediction}</p>}
        </div>
    );
};

export default PredictionForm;
