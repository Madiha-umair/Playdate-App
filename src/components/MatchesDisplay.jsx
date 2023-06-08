import axios from 'axios';
import {useState} from 'react';

export default function MatchesDisplay({matches}) {

    const [matchedProfiles, setMatchedProfiles] = useState (null);
    const matchedUserIds = matches.map(({user_id}) => user_id);
    const getMatches = async() => {
      try {
        const response = await axios.get('http://localhost:8888/users', {
          params: { userIds: JSON.stringify(matchedUserIds)}  //json.stringify because it passing through array of matcheduserIds
        })
        setMatchedProfiles(response.data);
      } catch (error){
      console.log("Error" + error);
    }
  };

    useEffect ( () => {
      getMatches();
    },[]);

    return (
      <div className="matchesDisplay">
        
      </div>
    );
  }