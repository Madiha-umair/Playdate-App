import TinderCard from 'react-tinder-card';
import Messages from "../components/Messages";
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [matchedUsers, setMatchedUsers] = useState(null);
  const [lastDirection, setLastDirection] = useState(null);
  const [cookies, setCookies, removeCookie] = useCookies(['user']);
  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8888/user', { params: { userId: userId } });
      setUser(response.data);
      console.log("Current user:", response.data);
    } catch (error) {
      console.log('Error fetching user:', error.message);
    }
  };
  console.log("I am outside getUser user:", user);




  const getMatchedUsers = async () => {

    //console.log("I AM HERE " + user);
    try {
      //console.log("show city " + user);
      //console.log("show city2 " + user.city);
     /* if (!user || !user.city) {
        // Handle case when user or user.city is not available
        return;
      }*/
  
      const response = await axios.get('http://localhost:8888/matched-users', {
        params: { city: user?.show_matches }
      });
      
      setMatchedUsers(response.data);
      //console.log("this is should be array:" +response.data);
      console.log("this is should be array:", JSON.stringify(response.data));
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getUser();
    getMatchedUsers();
  }, [user, matchedUsers]);

    console.log("Updated user4:", user);
    console.log("Updated user4:", matchedUsers);




  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("http://localhost:8888/addmatch", {
        userId,
        matchedUserId
      });
      getUser();
    } catch (error) {
      console.log("Error updating matches:", error.message);
    }
  };

  const swiped = (direction, swipedUserId) => {
    if (direction === 'right') {
      updateMatches(swipedUserId);
    }

    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  const matchedUserIds = (user?.matches || []).map(({ user_id }) => user_id).concat(userId);

  const filteredCityUsers = matchedUsers?.filter(matchedUser => !matchedUserIds.includes(matchedUser.user_id));

  return (
    <div>
      {user && user.user_id && (
        <div className="dashboard">
          <Messages user={user} />
          <div className="movetoNext">
            <div className="cardContanier">
              {filteredCityUsers?.map((matchedUser) => (
                <TinderCard
                  className='swipe'
                  key={matchedUser.child_name}
                  onSwipe={(dir) => swiped(dir, matchedUser.user_id)}
                  onCardLeftScreen={() => outOfFrame(matchedUser.child_name)}
                >
                  <div
                    style={{ backgroundImage: matchedUser.url ? `url(${matchedUser.url})` : 'none' }}
                    className="card"
                  >
                    <h3>{matchedUser.child_name}</h3>
                  </div>
                </TinderCard>
              ))}
              <div className="swipeInfo">
                {lastDirection ? <p>You swiped {lastDirection}</p> : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;