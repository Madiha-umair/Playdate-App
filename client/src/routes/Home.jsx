//import Question from "../components/Question";
import Nav from "../components/Nav";
import AuthenticationForm from '../components/AuthenticationForm'
import {useState} from 'react';

export default function Home() {

  const [showAuth, setShowAuth] =useState(false)
  const [isSignup, setisSignup] = useState(true)  /*at home page sign up state is stored, initially 'true' */
  const authentication = false;

  const clickFunc = () => {
  console.log('clicked');
  setShowAuth(true)
  setisSignup(true)
}
    /*line:23 recieving "isSignup" value from "nav.jsx"  to change its value , when user click 'log in' its value becomes 'false' */
  return (
    <div>
    <Nav setShowAuth= {setShowAuth} showAuth= {showAuth} setisSignup ={setisSignup}/> 
     
    <main id="main">

      <button className= "btn" onClick={clickFunc}>
        {authentication ? 'signout' : 'create account'}
      </button>

      {showAuth && (
        <AuthenticationForm setShowAuth= {setShowAuth} isSignup ={isSignup}/>
      )}
    </main>
    </div>
  );
}