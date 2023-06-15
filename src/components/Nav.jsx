
import Logo from '../assets/images/logo.png';


export default function Nav({ authToken,setShowAuth, showAuth, setisSignup }) {

  const clickFunc = () => {
    setShowAuth(true)
    setisSignup(false)
  }


  /* line 24: when we click on button it changed line:9 isSignup to 'false' */
  return (
    <nav id="main-nav" aria-label="Main navigation">
      <div className="logo">
        <img className="logoimg" src={Logo} />
      </div>
      {!authToken &&
        <button className="login-btn"
          onClick={clickFunc}
          disabled={showAuth}
        >Log in</button>}
    </nav>
  );
}