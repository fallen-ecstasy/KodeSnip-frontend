import React, {useState} from 'react'

import {Link, useNavigate} from 'react-router-dom'

import { loginUser } from '../../services/api'

import { useAuthContext } from '../../hooks/useAuthContext'


// default values of form 
const defaultValue = {
  email: '',
  password: ''
}

// modal alert message
const Alert = ({ message, onClose }) => {
  return (
    <div className="alert">
      <div className="alert-content">
        <div className="alert-message">{message}</div>
        <button className="alert-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const LoginForm = () => {

  // alert message
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // alert message
  const handleCloseAlert = () => {
    setShowAlert(false);
  };


  const [user, setUser] = useState(defaultValue)

  const { dispatch } = useAuthContext()

  // navigate after success
  const navigate = useNavigate()

  // handling change to form 
  const onValueChange = (e) => {
    //console.log(e.target.name, e.target.value);
    setUser({ ...user, [e.target.name] : e.target.value })
    //console.log(user)
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {
      const response = await loginUser(user)
      console.log(response)

      // save data to local storage
      localStorage.setItem('user', JSON.stringify(response))

      // update the auth context
      dispatch({type: 'LOGIN', payload: response})

      setUser(defaultValue)
      navigate('/codes')

    } catch (error) {
      
      console.log(error.message)

      if(error.message === 'All fields must be filled') {
        setAlertMessage('All fields must be filled')
        setShowAlert(true)
      }

      if(error.message === 'Invalid email or password') {
        setAlertMessage('Invalid Email or Password')
        setShowAlert(true);
      }

    }

  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
            <div>
              <label >
                Email
                <input type="text" value={user.email} name='email' onChange={onValueChange} className='input-field' />
              </label>
            </div>

            <div>
              <label >
                Password 
                <input type="password" value={user.password} name='password' onChange={onValueChange} className='input-field' autoComplete='off' />
              </label>
            </div>

            <button type='submit' className='submit-button' >Login</button>

      </form>

      <p>New to Codeshare <Link to={'/register'}>Sign up here</Link> </p> 

      {/* modal alert messages */}
      {showAlert && (
        <div className="alert-wrapper">
          <Alert message={alertMessage} onClose={handleCloseAlert} />
        </div>
      )}

    </div>
  )
}

export default LoginForm