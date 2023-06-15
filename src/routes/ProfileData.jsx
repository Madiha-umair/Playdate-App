import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfileData = () => {
  const { userId } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/profiledata/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.child_name}</p>
      <img src={"http://localhost:8888/" + user.picture} alt={"profile picture of" + user.child_name} style={{ width: "300px", height: "300px" }} />
      <p>age: {user.age}</p>
      <p>gender:{user.gender}</p>
      <p>city:{user.city}</p>
      <p>country:{user.country}</p>
      <p>language:{user.language}</p>
      <p>other_language:{user.other_language}</p>
      <p>show_matches: {user.show_matches}</p>
      <p>interest: {user.interest}</p>
      <p>availability: {user.availability}</p>
      <p>additional_info:{user.additional_info}</p>

    </div>
  );
};

export default ProfileData;