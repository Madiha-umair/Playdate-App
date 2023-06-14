import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const AuthenticationForm = ({ setShowAuth, isSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  let navigate = useNavigate();

  //console.log(email, password, confirmPassword);

  const handleClick = () => {
    setShowAuth(false);
  };
  /************ Handle form submit **************/
  const submitFunc = async (e) => {
    e.preventDefault();
    try {
      if (isSignup && password !== confirmPassword) {
        setError('Password not matching!');
        return;
      }
      const url = isSignup ? 'signup' : 'login';
      const response = await axios.post(`http://localhost:8888/${url}`, {
        email,
        password,
      });
  
      if (response.status === 200 || response.status === 201) {
        setCookie('AuthToken', response.data.token);
        setCookie('UserId', response.data.userId);
  
        if (isSignup) {
          navigate('/profile');
        } else {
          navigate('/dashboard');
        }
        window.location.reload();
      } else {
        setError('An error occurred. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error
        if (error.response.status === 404) {
          setError('User does not exist. Please proceed to sign up.');
        } else if (error.response.status === 401) {
          setError('Incorrect password. Please try again.');
         } else if (error.response.status === 409) {
            setError('User already exists. Please proceed to login.');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        // Request failed or network error
        setError('An error occurred. Please check your internet connection and try again.');
      }
    }
  };

  return (
    <div className="authentication">
      <div className="close" onClick={handleClick}>
        [X]
      </div>
      <h2>{isSignup ? 'Create Account' : 'Log in'}</h2>
      <p>
        By clicking log in, you agree to our terms. Learn how we process your
        data in our Privacy Policy
      </p>
      <form onSubmit={submitFunc} >
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required={true}
          //value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required ={true}
         // value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignup && (
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            required ={true}
            //value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <button className="form-submit-btn" type="submit">Submit</button>
        <p>{error}</p>
      </form>
      <hr />
      <h2>GET THE APP</h2>
    </div>
  );
};

export default AuthenticationForm;