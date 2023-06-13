import axios from 'axios';
import {useEffect, useState} from 'react';
import { useCookies } from "react-cookie";

export default function MatchesDisplay({matches, setSelectedUser}) {

  const [matchedProfiles, setMatchedProfiles] = useState (null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const matchedUserIds = matches?.map(({user_id}) => user_id);

  const userId = cookies.UserId;

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
  },[matches]);

  console.log(" these are matched profiles:" ,matchedProfiles);
  

  // filter func when both people match with each other then they can msg
  /*const filteredMatchedProfiles = matchedProfiles?.filter(
    (matchedProfile) =>
      matchedProfile.matches.filter((profile) => profile.user_id == userId)
        .length > 0
  );*/

    return (
      <div className="matchesDisplay">
        
        {matchedProfiles?.map((match) =>(   // if matchprofiles exist then map each match on an index
          <div key ={match.user_id} className="matchCard" onClick={()=>setSelectedUser(match)}>
            <div className="imageContainer">       
              <h3>{match?.child_name}</h3>
              </div>
          </div>
        ))}
      </div>
    );

  }

  /*
  
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useCookies } from "react-cookie";

export default function MatchesDisplay({matches, setSelectedUser}) {

    const [matchedProfiles, setMatchedProfiles] = useState (null);
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const matchedUserIds = matches.map(({user_id}) => user_id);
    const userId = cookies.UserId;

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
    },[matches]);

    console.log(matchedProfiles);

    const filteredMatchedProfiles = matchedProfiles?.filter(
      (matchedProfile) =>
        matchedProfile.matches.filter((profile) => profile.user_id == userId)
          .length > 0
    );
  

    return (
      <div className="matchesDisplay">
        {filteredMatchedProfiles?.map((match, _index) =>(   // if matchprofiles exist then map each match on an index
          <div key ={_index} className="matchCard" onClick={()=>setSelectedUser(match)}>
            <div className="imageContainer">
              <img src={match?.picture} alt={match?.child_name + 'profile'}/>
              <h3>{match?.child_name}</h3>
              </div>
          </div>
        ))}
      </div>
    );
  }
  */