import TinderCard from 'react-tinder-card';
import Messages from "../components/Messages";
import '@react-spring/web';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
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
    const [cookies, setCookies, removeCookie] = useCookies(['user'])
    const userId = cookies.UserId;

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8888/user', {params: { userId }})
            setUser(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const getMatchedUsers = async () => {
        try {
            console.log("user", user);
            const response = await axios.get("http://localhost:8888/matched-users", {
                params: { city: user?.show_matches }
            });
            setMatchedUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };
   
    useEffect(() => {
        getUser()

    }, [])

    useEffect(() => {
        if (user) {
            getMatchedUsers()
        }
    }, [user]) // everytime user going to change 

    console.log('here is the matched users', matchedUsers);
    

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put("http://localhost:8888/addmatch", {
                userId,
                matchedUserId
            })
            getUser();
        } catch (err) {
            console.log("Error", err);
        }
    }

    console.log(user);

    const swiped = (direction, swipedUserId) => {

        if (direction === 'right') {
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
            {user &&
                <div className="dashboard">
                    <Messages user={user} />
                    <div className="movetoNext">
                        <div className="cardContanier">

                            {filteredCityUsers?.map((matchedUser) =>
                                <TinderCard className='swipe'
                                    key={matchedUser.child_name}
                                    onSwipe={(dir) => swiped(dir, matchedUser.user_id)}
                                    onCardLeftScreen={() => outOfFrame(matchedUser.child_name)}>
                                        
                                        <div
  style={{
    backgroundImage: `url("http://localhost:8888/${matchedUser.picture}")`,
  }}
  className="card"
>
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