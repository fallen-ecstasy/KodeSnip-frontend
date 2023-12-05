import React from "react";
import Navbar from '../Header/Navbar'
import LoginForm from "./LoginForm";

import './Login.css'

const Login = () => {
    return (<>
        <Navbar />

        <h1 className="login-form-heading">Log in to access your saved codes</h1>

        <LoginForm />

    </>)

}

export default Login