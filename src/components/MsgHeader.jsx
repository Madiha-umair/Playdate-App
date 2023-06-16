import {useCookies } from 'react-cookie';

export default function MsgHeader ({user}) {

  const [ cookies, setCookie, removeCookie ] = useCookies(['user'])
  
  const logout = () =>{
    removeCookie('UserId',cookies.UserId);
    removeCookie('AuthToken', cookies.AuthToken)
    window.location.reload();  
  } 
  
  return (
      <div className="msgboxHeader">
        <div className="profileContainer">
            <div className="imgContainer">
                <img src={user.picture} alt = { "profile picture of" + user.child_name}  />
                
            </div>
            <h3>{user.child_name}</h3>
        </div>
            <i className="logoutIcon" onClick={logout}>Logout [X]</i>
      </div>
    );
  }