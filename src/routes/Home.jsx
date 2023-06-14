
import Nav from "../components/Nav";
import AuthenticationForm from '../components/AuthenticationForm'
import {useState} from 'react';
import {useCookies} from "react-cookie";

export default function Home() {

  const [showAuth, setShowAuth] =useState(false)
  const [isSignup, setisSignup] = useState(true)  /*at home page sign up state is stored, initially 'true' */
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const authToken = cookies.AuthToken
  

  const clickFunc = () => {
    if (authToken) {
      removeCookie('UserId', cookies.UserId)
      removeCookie('AuthToken', cookies.AuthToken)
      window.location.reload()
      return
  }
  console.log('clicked');
  setShowAuth(true)
  setisSignup(true)
}
    /*line:23 recieving "isSignup" value from "nav.jsx"  to change its value , when user click 'log in' its value becomes 'false' */
  return (
    <div>
    <Nav authToken={authToken} setShowAuth= {setShowAuth} showAuth= {showAuth} setisSignup ={setisSignup}/> 
     
    <main id="main">

      <button className= "btn" onClick={clickFunc}>
        {authToken? 'signout' : 'create account'}
      </button>

      {showAuth && (
        <AuthenticationForm setShowAuth= {setShowAuth} isSignup ={isSignup}/>
      )}
    </main>
    </div>
  );
}