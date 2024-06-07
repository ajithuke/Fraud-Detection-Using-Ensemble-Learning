import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Result = () => {

    const [problem, setProblem] = useState('');
    const [details, setDetails] = useState('');

    return (
        <div className="container">
            <h1 className="center">Fraud Transaction</h1>
            <div className="mt-5">
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Please tell your problem</Form.Label>
                        <div className="border">
                            <Form.Control
                                value={problem}
                                onChange={(e) => { setProblem(e.target.value) }}
                                as="textarea"
                                rows={3}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Transaction details</Form.Label>
                        <Form.Control
                            value={details}
                            onChange={(e) => { setDetails(e.target.value) }}
                            type="text"
                            placeholder=""
                        />
                        <Form.Text muted>
                            Please Enter comma( , ) separated values
                        </Form.Text>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default Result;