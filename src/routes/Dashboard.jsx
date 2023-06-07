import TinderCard from 'react-tinder-card';
import Messages from "../components/Messages";
import '@react-spring/web';
import { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';
import axios from 'axios';


const Dashboard = () => {
    const [user, setUser] = useState({
        user_id: '',
        picture: '',
        child_name: '',
        age: '',
        gender: '',
        city: '',
        country: '',
        language: '',
        other_language: '',
        show_matches: '',
        interest: [],
        availability: [],
        additional_info: '',
    })

    const [matchedUsers, setMatchedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookies, removeCookie ] = useCookies (['user'])
    const userId = cookies.UserId;

    const getUser = async () => {
        try {
          const response = await axios.get('http://localhost:8888/user', { params: { userId: userId } });
          setUser(response.data);
        } catch (error) {
          console.log(error.message);
        }
      };

      const getMatchedUsers = async () => {
        try {
          if (user && user.show_matches) {
            console.log("user?.show_matches:", user.show_matches);
            const response = await axios.get("http://localhost:8888/matched-users", {
              params: { city: user.show_matches }
            });
            setMatchedUsers(response.data);
          }
        } catch (error) {
          console.log(error.message);
        }
      }

        useEffect(() => {
            const fetchData = async () => {
              await getUser();
              getMatchedUsers();
            };
          
            fetchData();
          }, [])
    
          useEffect(() => {
            if (user && user.show_matches) {
              getMatchedUsers();
            }
          }, [user]);  // array[] is  empty to receive only 1 time

    console.log ('here is the matched users', matchedUsers)
    
    const updateMatches = async (matchedUserId) => {
        try {
          await axios.put("http://localhost:8888/addmatch", {
            userId,
            matchedUserId
          });
          getUser();
        } catch (error) {
          console.log("Error", error.message);
        }
      };

    console.log(user);

    const swiped = (direction, swipedUserId) => {

        if(direction === 'right')
        {
            updateMatches(swipedUserId);
        }
        
        setLastDirection(direction);
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    const matchedUserIds = (user?.matches ?? []).map(({ user_id }) => user_id).concat(userId);

    const filteredCityUsers = matchedUsers?.filter(matchedUser => !matchedUserIds.includes(matchedUser.user_id));
    console.log('filteredCityUsers ', filteredCityUsers);


    return (
        <div>
            { user &&
        <div className="dashboard">
            <Messages user ={user} />
            <div className="movetoNext">
                <div className="cardContanier">

                    {filteredCityUsers?.map((matchedUser) =>
                        <TinderCard className='swipe'
                            key={matchedUser.child_name}
                            onSwipe={(dir) => swiped(dir, matchedUser.user_id)}
                            onCardLeftScreen={() => outOfFrame(matchedUser.child_name)}>
                            <div style={{ backgroundImage: matchedUser.url ? `url(${matchedUser.url})` : 'none', }} className="card">
                                <h3>{matchedUser.child_name}</h3>
                            </div>
                        </TinderCard>
                    )}
                    <div className="swipeInfo">
                        {lastDirection ? <p> you swiped {lastDirection}</p> : <p />}
                    </div>
                </div>
            </div>
        </div>
}
        </div>
    )
                    }
export default Dashboard