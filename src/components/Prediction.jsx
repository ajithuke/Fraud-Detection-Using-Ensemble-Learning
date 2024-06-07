import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const PredictionForm = () => {
    const [input, setInput] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', { feature: input });
            setPrediction(response.data.prediction);
            setError('');
        } catch (error) {
            setError('There was an error!');
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
                <br/>
                <Button variant="success" type="submit" className='mt-3'>Predict</Button>
            </form>
            <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {prediction !== null && <h2>Transaction is {prediction ? 'Fraud' : 'Legit'} </h2>}
        </div>
    );
};

export default PredictionForm;
