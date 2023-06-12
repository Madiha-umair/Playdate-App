import TinderCard from 'react-tinder-card';
import MsgContainer from "../components/MsgContainer";
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


    console.log('this is get user1 ', userId);




    const getUser = async () => {
        console.log('this is get user2 ', userId);
        try {
            console.log('this is get user3 ', userId);
            const response = await axios.get('http://localhost:8888/user', { params: { userId } })
            setUser(response.data);
            console.log('this is get user4 ', response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    console.log('this is get user5 ', userId);
    const getMatchedUsers = async () => {
        try {
            console.log("user", user);
            const response = await axios.get("http://localhost:8888/matched-users", {
                params: { userCity: user?.show_matches }
            });
            setMatchedUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };


   

    useEffect(() => {
        getUser()

    }, [])
    console.log('this is get user6 ', user);
    useEffect(() => {
        if (user) {
            getMatchedUsers()
        }
    }, [user]) // everytime user going to change 

    
    console.log('this is get user7 ', user);

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

   // const UserId = (user?.matches ?? []).map(({ user_id }) => user_id).concat(userId);
   // const filteredCityUsers = matchedUsers?.filter(matchedUser => !UserId.includes(matchedUser.user_id));

    //const matchedUserIds = (user?.matches ?? []).map(({ user_id }) => user_id).concat(userId);
    const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)
    const filteredCityUsers = matchedUsers?.filter(matchedUser => !matchedUserIds.includes(matchedUser.user_id));
   // console.log('filteredCityUsers ', filteredCityUsers);

    console.log('matchedUserIds', matchedUserIds);

    console.log('filteredCityUsers ', filteredCityUsers);


    return (
        <div>
            {user &&
                <div className="dashboard">
                    <MsgContainer user={user}  />
                    <div className="movetoNext">
                        <div className="cardContanier">

                            {filteredCityUsers?.map((matchedUser) =>
                                <TinderCard className='swipe'
                                    key={matchedUser.user_id}
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