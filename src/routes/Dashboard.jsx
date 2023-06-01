import TinderCard from 'react-tinder-card';
import Messages from "../components/Messages";
import '@react-spring/web';
import { useState } from 'react';


const Dashboard = () => {
    const [profileData, setProfileData] = useState({
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

    const characters = [
        {
            name: 'Richard Hendricks',
            url: profileData.picture ? URL.createObjectURL(profileData.picture) : null,
        },
        {
            name: 'Erlich Bachman',
            url: profileData.picture ? URL.createObjectURL(profileData.picture) : null,
        },
        {
            name: 'Monica Hall',
            url: profileData.picture ? URL.createObjectURL(profileData.picture) : null,
        },
        {
            name: 'Jared Dunn',
            url: profileData.picture ? URL.createObjectURL(profileData.picture) : null,
        },
        {
            name: 'Dinesh Chugtai',
            url: profileData.picture ? URL.createObjectURL(profileData.picture) : null,
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
        <div className="dashboard">
            <Messages />
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

    )
}
export default Dashboard