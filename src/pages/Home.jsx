import React, { useEffect } from "react";
import PredictionForm from "../components/Prediction";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const firebase = useFirebase();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!firebase.isLoggedIn){
            navigate("/login");
        }
    },[firebase,navigate])

    return (
        <div className="container center">
            <h1>Prediction App</h1>
            <PredictionForm />
        </div>
    )
}

export default HomePage;