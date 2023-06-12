import MsgHeader from './MsgHeader'
import MatchesDisplay from './MatchesDisplay'
import MsgDisplay from './MsgDisplay'
import { useState } from 'react'

const MsgContainer = ({ user }) => {
    const [ selectedUser, setSelectedUser ] = useState(null)
/*
    return (
        <div className="msg_container">
            <MsgHeader user={user}/>

            <div>
                <button className="option" onClick={() => setSelectedUser(null)}>Matches</button>
                <button className="option" disabled={!selectedUser}>Message</button>
            </div>

            {!selectedUser && <MatchesDisplay matches={user.matches} setSelectedUser={setSelectedUser}/>}

            {selectedUser && <MsgDisplay user={user} selectedUser={selectedUser}/>}
        </div>
    )
}
*/

return (
    <div className="msgContainer">
      <MsgHeader user={user} />
      <div>
        <button className="option">Matches</button>
        <button className="option">Chat</button>
      </div>
      <MatchesDisplay matches={user.matches} />
      <MsgDisplay user={user}  />

    </div>
  );
}

export default MsgContainer