/*import React from 'react';
import MsgDisplay from './MsgDisplay';
import MsgboxHeader from './MsgboxHeader';
import MatchesDisplay from './MatchesDisplay';

export default function Messages({user ,filteredCityUsers}) {

  console.log("recieved value of user:  ", user);
  console.log("recieved value of FILTERED user:  ", filteredCityUsers);
 
  return (
    <div className="msgContainer">
      <MsgboxHeader user={user} />
      <div>
        <button className="option">Matches</button>
        <button className="option">Chat</button>
      </div>
      <MatchesDisplay filteredCityUsers={filteredCityUsers}/>
      <MsgDisplay user={user}  />

    </div>
  );
}
*/

const Messages = ({descendingOrderMessages}) => {
  return (
      <>
          <div className="msgDisplay">
              {descendingOrderMessages.map((message, _index) => (
                  <div key={_index}>
                      <div className="chat-message-header">
                          <div className="img-container">
                              <img src={message.img} alt={message.name + ' profile'}/>
                          </div>
                          <p>{message.name}</p>
                      </div>
                      <p>{message.message}</p>
                  </div>
              ))}
          </div>
      </>
  )
}

export default Messages