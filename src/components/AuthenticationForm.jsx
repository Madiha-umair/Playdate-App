import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthenticationForm = ({ setShowAuth, isSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const handleClick = () => {
    setShowAuth(false);
  };

  const submitFunc = async (e) => {
    e.preventDefault();
    try {
      if (isSignup && password !== confirmPassword) {
        setError('Password not matching!');
        return;
      }
      const response = await axios.post('http://localhost:8888/signup', {
        email,
        password,
      });

      const success = response.status === 201;

      if (success) navigate('/dashboard');
    } catch (error) {
      console.log(error);
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
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignup && (
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
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