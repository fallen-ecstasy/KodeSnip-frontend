import React from "react";
import Navbar from '../Header/Navbar'
import RegisterForm from "./RegisterForm";

import './Register.css'

const Register = () => {
    return (<>

        <Navbar />

        <h1 className="registration-form-heading">Sign up to save codes</h1>

        <RegisterForm />

    </>)

}

export default Register