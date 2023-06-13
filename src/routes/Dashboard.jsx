import TinderCard from 'react-tinder-card';
import MsgContainer from "../components/MsgContainer";
import '@react-spring/web';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';


const Dashboard = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const userId = cookies.UserId;
    // const [user, setUser] = useState(null);
    const [user, setUser] = useState({
        user_id: cookies.UserId,
        picture: '',
        //picturePreview: null,
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
        matches: []
    });
    const [matchedUsers, setMatchedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()

    // console.log("yes i am userid:", userId);
    // console.log("yes i am matches value initially:" , user.matches);
    // console.log("yes i am matches value initially:", user);

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8888/user', { params: { userId: userId } })
            setUser(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    /* useEffect(() => {
         getUser();
     
       }, []);
       console.log(" user:", user);*/

    const getMatchedUsers = async () => {
        try {

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
    }, [user])

    // console.log("yes i am userdata at client side:", user);
    // console.log('here is the matched users', matchedUsers)

    const updateMatches = async (matchedUserId) => {

        try {
            await axios.put("http://localhost:8888/addmatch", {
                userId,
                matchedUserId
            })
            getUser();
            console.log("userId & matchedUserId3 ", userId, matchedUserId)
        } catch (err) {
            console.log("Error", err);
        }
    }

    console.log(" i am user value after update match function:", user);

    const swiped = (direction, swipedUserId) => {

        if (direction === 'right') {
            console.log(" swipe user id1  is: ", swipedUserId)
            updateMatches(swipedUserId);
            console.log(" swipe user id2  is: ", swipedUserId)
        }

        setLastDirection(direction);
        console.log(" swipe user id3  is: ", swipedUserId)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }


    console.log(" i am user value after swipe function:", user);
    //const matchedUserIds = (user?.matches ?? []).map(({ user_id }) => user_id).concat(userId);
    //const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId);
    const matchedUserIds = user?.matches?.map(({ user_id }) => user_id).concat(userId) || [];


    const filteredCityUsers = matchedUsers?.filter(matchedUser => !matchedUserIds.includes(matchedUser.user_id));
    console.log('filteredCityUsers ', filteredCityUsers);
    console.log('MatchedUsers ', matchedUsers);

    


    return (
        <div>
            {user &&
                <div className="dashboard">
                    <MsgContainer user={user} />
                    <div className="movetoNext">
                        <div className="cardContanier">
                            {filteredCityUsers?.map((matchedUser) =>
                                <TinderCard className='swipe'
                                    key={matchedUser.user_id}
                                    onSwipe={(dir) => swiped(dir, matchedUser.user_id)}
                                    onCardLeftScreen={() => outOfFrame(matchedUser.child_name)}>
                                    <div style={{ backgroundImage: matchedUser.picture ? `url(${matchedUser.picture})` : 'none', }} className="card">
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