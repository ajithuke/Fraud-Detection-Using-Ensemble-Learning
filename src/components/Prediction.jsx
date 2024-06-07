import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PredictionForm = () => {

    const navigate = useNavigate();

    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState('');

    const [step, setStep] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [oldbalanceOrg, setOldbalanceOrg] = useState('');
    const [newbalanceOrg, setNewbalanceOrg] = useState('');
    const [oldbalanceDest, setOldbalanceDest] = useState('');
    const [newbalanceDest, setNewbalanceDest] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const str = `${step},${type},${amount},${oldbalanceOrg},${newbalanceOrg},${oldbalanceDest},${newbalanceDest}`;
            const response = await axios.post('http://127.0.0.1:5000/predict', { feature: str });
            setPrediction(response.data.prediction);
            setError('');
        } catch (error) {
            setError('There is an error!');
            console.error('There is an error!', error);
        }
    };

    return (
        <div className='container'>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label>Step</Form.Label>
                    <Form.Control
                        value={step}
                        onChange={(e) => { setStep(e.target.value) }}
                        type="text"
                        placeholder=""
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        value={type}
                        onChange={(e) => { setType(e.target.value) }}
                        type="text"
                        placeholder=""
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        value={amount}
                        onChange={(e) => { setAmount(e.target.value) }}
                        type="text"
                        placeholder=""
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>OldbalanceOrg</Form.Label>
                    <Form.Control
                        value={oldbalanceOrg}
                        onChange={(e) => { setOldbalanceOrg(e.target.value) }}
                        type="text"
                        placeholder=""
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>NewbalanceOrg</Form.Label>
                    <Form.Control
                        value={newbalanceOrg}
                        onChange={(e) => { setNewbalanceOrg(e.target.value) }}
                        type="text"
                        placeholder=""
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>OldbalanceDest</Form.Label>
                    <Form.Control
                        value={oldbalanceDest}
                        onChange={(e) => { setOldbalanceDest(e.target.value) }}
                        type="text"
                        placeholder=""
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>NewbalanceDest</Form.Label>
                    <Form.Control
                        value={newbalanceDest}
                        onChange={(e) => { setNewbalanceDest(e.target.value) }}
                        type="text"
                        placeholder=""
                    />
                </Form.Group>

                <Button variant="success" type="submit" className='mt-3'>Predict</Button>

            </Form>

            <br />
            {error ? <p style={{ color: 'red' }}>{error}</p> : prediction !== null && <h3>{prediction ? navigate("/result") : 'Legit'} </h3>}

        </div>
    );
};

export default PredictionForm;
