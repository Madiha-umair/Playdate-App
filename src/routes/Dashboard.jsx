import TinderCard from 'react-tinder-card';
import MsgContainer from "../components/MsgContainer";
import '@react-spring/web';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const userId = cookies.UserId;
    const [user, setUser] = useState({
        user_id: cookies.UserId,
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
        matches: []
    });
    const [matchedUsers, setMatchedUsers] = useState(null);
    const [lastDirection, setLastDirection] = useState();
    const [swipedUsers, setSwipedUsers] = useState([]);
    const [playdate, setPlaydate] = useState(null);

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8888/user', { params: { userId: userId } });
            setUser(response.data);
        }
        catch (error) {
            console.log(error);
        }
    };

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
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            getMatchedUsers();
        }
    }, [user]);

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put("http://localhost:8888/addmatch", {
                userId,
                matchedUserId
            });
            getUser();
        } catch (err) {
            console.log("Error", err);
        }
    };

    const createPlaydate = async (matchedUserId) => {
        try {
            const response = await axios.post("http://localhost:8888/create-playdate", {
                userId,
                matchedUserId
            });
            setPlaydate(response.data);
        } catch (err) {
            console.log("Error", err);
        }
    };
        console.log("this is playdate: " , playdate);

    const swiped = (direction, swipedUserId) => {
        if (direction === 'right' || direction === 'up') {
            updateMatches(swipedUserId);
        }
        setLastDirection(direction);
    };

    const outOfFrame = (childName) => {
        console.log(childName + " left the screen");
    };

    const matchedUserIds = user?.matches?.map(({ user_id }) => user_id).concat(userId) || [];
    const filteredCityUsers = matchedUsers?.filter(matchedUser => !matchedUserIds.includes(matchedUser.user_id));

    return (
        <div>
            {user && (
                <div className="dashboard">
                    <MsgContainer user={user} />
                    <div className="movetoNext">
                        <div className="cardContanier">
                            {filteredCityUsers && filteredCityUsers.length > 0 ? (
                                filteredCityUsers.map((matchedUser) => (
                                    <TinderCard
                                        className="swipe"
                                        key={matchedUser.user_id}
                                        onSwipe={(dir) => swiped(dir, matchedUser.user_id)}
                                        onCardLeftScreen={() => outOfFrame(matchedUser.child_name)}
                                    >
                                        <div
                                            style={{
                                                backgroundImage: matchedUser.picture
                                                    ? `url(${matchedUser.picture.replace(/\\/g, '/')})`
                                                    : 'none',
                                            }}
                                            className="card"
                                        >
                                            <Link to={`/profiledata/${matchedUser.user_id}`}>
                                                <h3>{matchedUser.child_name}</h3>
                                            </Link>
                                            <button onClick={() => createPlaydate(matchedUser.user_id)}>Create Playdate</button>
                                          
{playdate && (
    <div>
        Playdate: {playdate.date } , User:{playdate.matchedUserId } 
    </div>
)}

                                        </div>
                                    </TinderCard>
                                ))
                            ) : (
                                <div
                                    className="no-matches-message"
                                    style={{
                                        width: "300px",
                                        height: "300px",
                                        backgroundColor: "white",
                                        margin: "0 0 0 300px",
                                    }}
                                >
                                    Sorry, no matches at this time!
                                </div>
                            )}
                            <div className="swipeInfo">
                                {lastDirection ? <p>you swiped {lastDirection}</p> : <p />}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
/*import TinderCard from 'react-tinder-card';
import MsgContainer from "../components/MsgContainer";
import '@react-spring/web';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const userId = cookies.UserId;
    //const [user, setUser] = useState(null);
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
    const [matchedUsers, setMatchedUsers] = useState(null);
    const [lastDirection, setLastDirection] = useState();
    const [swipedUsers, setSwipedUsers] = useState([]);
    

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8888/user', { params: { userId: userId } })
            setUser(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

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

    // console.log(" user value:", user);

    const swiped = (direction, swipedUserId) => {

        if (direction === 'right' || direction === 'up') {
            updateMatches(swipedUserId);
        }

        setLastDirection(direction);
    }

    

    const matchedUserIds = user?.matches?.map(({ user_id }) => user_id).concat(userId) || [];

    // count user himself as a match then use this line
    const filteredCityUsers = matchedUsers?.filter(matchedUser => !matchedUserIds.includes(matchedUser.user_id));

    // if dont want  to count user himself as a match then use this line
    //const filteredCityUsers = matchedUsers?.filter(matchedUser => matchedUser.user_id !== userId && !matchedUserIds.includes(matchedUser.user_id));

    return (
        <div>
            {user && (
                <div className="dashboard">
                    <MsgContainer user={user} />
                    <div className="movetoNext">
                        <div className="cardContanier">
                            {filteredCityUsers && (filteredCityUsers.length > 0) ? (
                                filteredCityUsers.map((matchedUser) => (
                                    <TinderCard
                                        className="swipe"
                                        key={matchedUser.user_id}
                                        onSwipe={(dir) => swiped(dir, matchedUser.user_id)}
                                        onCardLeftScreen={() => outOfFrame(matchedUser.child_name)}
                                    >
                                         <div
                                                style={{
                                                    backgroundImage: matchedUser.picture
                                                        ? `url(${matchedUser.picture.replace(/\\/g, '/')})`
                                                        : 'none',
                                                }}
                                                className="card"
                                            >
                                                <Link to={`/profiledata/${matchedUser.user_id}`}>
                                                <h3>{matchedUser.child_name}</h3>
                                        </Link>
                                                </div>
                                        
                                    </TinderCard>
                                ))
                            ) : (
                                <div
                                    className="no-matches-message"
                                    style={{
                                        width: "300px",
                                        height: "300px",
                                        backgroundColor: "white",
                                        margin: "0 0 0 300px",
                                    }}
                                >
                                    Sorry, no matches at this time!
                                </div>
                            )}
                            <div className="swipeInfo">
                                {lastDirection ? <p>you swiped {lastDirection}</p> : <p />}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Dashboard;
//previous code for tinder card display
/*  return (
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
                                    <div style={{ backgroundImage: matchedUser.picture ? `url(${matchedUser.picture.replace(/\\/g, '/')})` : 'none' }} className="card">
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
export default Dashboard*/ 