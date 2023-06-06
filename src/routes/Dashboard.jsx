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
        show_matches: [],
        interest: [],
        availability: [],
        additional_info: '',
    })

    const [cookies, setCookies, removeCookie ] = useCookies (['user'])
    const userId = cookies.UserId;
    const getUser = async () => {
        try{
            const response = await axios.get('http://localhost:8888/user',{ params: {userId}})
            setUser(response.data)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(() =>{
        getUser()
    }, [])  // array empty to receive only 1 time

    console.log ('here is the users', user)
    



    const characters = [
        {
            name: 'Richard Hendricks',
            url: user.picture ? (user.picture) : null,
        },
        {
            name: 'Erlich Bachman',
            url: user.picture ? (user.picture) : null,
        },
        {
            name: 'Monica Hall',
            url: user.picture ? (user.picture) : null,
        },
        {
            name: 'Jared Dunn',
            url: user.picture ?(user.picture) : null,
        },
        {
            name: 'Dinesh Chugtai',
            url: user.picture ? (user.picture) : null,
        }
    ]
    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }
    return (
        <div>
            { user &&
        <div className="dashboard">
            <Messages user ={user} />
            <div className="movetoNext">
                <div className="cardContanier">

                    {characters.map((character) =>
                        <TinderCard className='swipe'
                            key={character.name}
                            onSwipe={(dir) => swiped(dir, character.name)}
                            onCardLeftScreen={() => outOfFrame(character.name)}>
                            <div style={{ backgroundImage: character.url ? `url(${character.url})` : 'none', }} className="card">
                                <h3>{character.name}</h3>
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