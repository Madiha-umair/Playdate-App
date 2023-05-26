import {useState} from 'react';

const AuthenticationForm = ({setShowAuth, isSignup}) => {
    const [email, setEmail] =useState(null);
    const [password, setPassword] =useState(null);
    const [confirmPassword, setConfirmPassword] =useState(null);
    const [error, setError] =useState(null);

    console.log(email, password, confirmPassword);

    const handleClick = () => {
        setShowAuth(false)
    }


    const submitFunc = (e) => {
        e.preventDefault()
        try{
            if(isSignup && (password !== confirmPassword))
            {
                setError("Password not matching!");
            }
            console.log("sign up request");
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