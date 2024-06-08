import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";

const LoginPage = () => {

    const firebase = useFirebase();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate("/")
        }
    }, [firebase, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await firebase.logInUser(email, password).then((obj) => {
            setEmail("")
            setPassword("")
        }).catch((error) => { alert("please create account") })
    }

    return (
        <div className="container custom-container mt-10">
            <h1 className="center mb-5 mt-5">Login Page</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        type="email"
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Log In
                </Button>
                <h5 className="mt-4 mb-4">OR</h5>
                <Button onClick={firebase.signInWithGoogle} variant="success">Sign in With Google</Button>
                <br></br>
                <div className="mt-3 last">
                    {"Not a member "} <a href="/signup">Sign up</a>
                </div>
            </Form>
        </div>
    )
}

export default LoginPage