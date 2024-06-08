import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState,useEffect } from "react";
import { useFirebase } from "../context/Firebase";

const RegisterPage = ()=>{

    const firebase = useFirebase();

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        if(firebase.isLoggedIn){
            navigate("/")
        }
    },[firebase,navigate])

    const handleSubmit =async (e)=>{
        e.preventDefault();
        await firebase.signUpUserWithEmailAndPassword(email,password).then((obj)=>{
            setEmail("")
            setPassword("")
        }).catch((error)=>{console.log(error)})
    }

    return (
        <div className="container text-color">
            <h1 className="register center ">Sign Up Page</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        type="email" 
                        placeholder="Enter email" 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        type="password" 
                        placeholder="Password" 
                    />
                </Form.Group>
      
                <Button variant="success" type="submit">
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}

export default RegisterPage