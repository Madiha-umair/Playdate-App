
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
/*
import Dashboard from "../routes/Dashboard";

const Messages = ({ descendingOrderMessages }) => {
  if (!descendingOrderMessages) {
    return <p>Loading messages...</p>;
   // return Dashboard;

  }

  if (descendingOrderMessages.length === 0) {
    return <p>No messages found.</p>;
  }

  return (
    <div className="msgDisplay">
      {descendingOrderMessages.map((message, index) => (
        <div key={index}>
          <div className="chat-message-header">
            <div className="img-container">
              <img src={message.img} alt={message.name + ' profile'} />
            </div>
            <p>{message.name}</p>
          </div>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;*/