import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

let navigate = useNavigate();


const AuthenticationForm = ({setShowAuth, isSignup}) => {
    const [email, setEmail] =useState(null);
    const [password, setPassword] =useState(null);
    const [confirmPassword, setConfirmPassword] =useState(null);
    const [error, setError] =useState(null);

    console.log(email, password, confirmPassword);

    const handleClick = () => {
        setShowAuth(false)
    }


    const submitFunc = async(e) => {
        e.preventDefault()
        try{
            if(isSignup && (password !== confirmPassword))
            {
                setError("Password not matching!");
                return
            }
            const response = await axios.post('http://localhost:8888/users', {email,password});

            const success = response.status === 201

            if(success) navigate('/dashboard')
        }
        catch (error)
        {
            console.log("error");
        }
    } /*as a default page refreshes we dont want our page refresh we want to stay there so,prevent form from refreshing*/

    return (
        <div className="authentication">
            <div className="close" onClick={handleClick}>[X]</div>
            <h2>{isSignup ? "Create Account" : "Log in"}</h2>
            <p>By clicking log in, you agree to our terms. Learn how we process your data in our Privacy Policy</p>
            <form onSubmit={submitFunc}>
                <input type="email" id="email" name="email" placeholder ="email" required={true} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" id="password" name="password" placeholder ="password" required={true} onChange={(e) => setPassword(e.target.value)} />
                {isSignup && 
                <input type="confirmPassword" id="confirmPassword" name="confirmPassword" placeholder ="Confirm Password" required={true} onChange={(e) => setConfirmPassword(e.target.value)} />
                }
               <input class="form-submit-btn" type="submit"/>
               <p>{error}</p>
            </form>
            <hr/>
            <h2>GET THE APP</h2>
        </div>
    )
}
export default AuthenticationForm