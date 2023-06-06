import { useState } from 'react';
import Nav from "../components/Nav";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from'axios';

const profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [profileData, setProfileData] = useState({
        user_id: cookies.UserId,
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

    let navigate = useNavigate();

    //lets populate the db
    const submitHandler = async (event) => {
        console.log('Form has been submitted!');
        event.preventDefault();
      
        try {
          const response = await axios.put('http://localhost:8888/user', profileData);
          console.log(response);
          const success = response.status === 200;
          if (success) navigate('/dashboard');
        } catch (err) {
          console.log(err);
        }
      }

  
    const eventHandler = (event) => {
        console.log('event', event)
        const { name, options, files } = event.target;

        if (name === 'picture') {
          const uploadedFile = files[0];
          // Perform any necessary operations with the uploaded file here
          console.log(uploadedFile);
          // Update the state with the uploaded file data
          setProfileData((prevState) => ({
            ...prevState,
            [name]: uploadedFile,
          }));
        } 
        else if (name === 'availability' || name === 'interest') {
            const selectedValues = Array.from(options)
                .filter(option => option.selected)
                .map(option => option.value);

            setProfileData(prevState => ({
                ...prevState,
                [name]: [...prevState[name], ...selectedValues],
            }));
        } else {
            const { value } = event.target;
            setProfileData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    console.log(profileData);


    /* save all inputs to state*/
    return (
        <div>
            <Nav setShowAuth={() => { }} showAuth={false} />
            <div className="profile">
                <h2>Create Account</h2>
                <form  onSubmit={submitHandler}>
                    <section>
                        <label htmlFor="picture">Upload Picture:</label>
                        <input type="file" id="picture" name="picture" accept="image/*" onChange={eventHandler} />
                        <label htmlFor="child_name">Child's Name</label>
                        <input type="text" name="child_name" id="child_name" placeholder="Child Name" required={true} value={profileData.child_name} onChange={eventHandler} />
                        <label htmlFor="age">Age</label>
                        <input type="number" name="age" id="age" placeholder="Age" required={true} value={profileData.age} onChange={eventHandler} />

                        <label>Gender</label>
                        <div>
                            <input type="radio" name="gender" id="girl" required={true} value="girl" onChange={eventHandler} checked={profileData.gender === "girl"} />
                            <label for="girl">Girl</label>
                            <input type="radio" name="gender" id="boy" required={true} value="boy" onChange={eventHandler} checked={profileData.gender === "boy"} />
                            <label for="boy">Boy</label>
                            <input type="radio" name="gender" id="other" required={true} value="other" onChange={eventHandler} checked={profileData.gender === "other"} />
                            <label for="other">Other</label>
                        </div>

                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city" placeholder="City" required={true} value={profileData.city} onChange={eventHandler} />
                        <label htmlFor="country">Country</label>
                        <input type="text" name="country" id="country" placeholder="Country" required={true} value={profileData.country} onChange={eventHandler} />
                        <label htmlFor="language">Language</label>
                        <input type="text" name="language" id="language" placeholder="Language" required={true} value={profileData.language} onChange={eventHandler} />
                        <label htmlFor="other_language">Other Language</label>
                        <input type="text" name="other_language" id="other_language" placeholder="Other Language" value={profileData.other_language} onChange={eventHandler} />


                        <label htmlFor="show_matches">Show matches in city:</label>
                        <input type="text" name="show_matches" id="show_matches" placeholder="City Name" required={true} value={profileData.show_matches} onChange={eventHandler} />

                        <label htmlFor="interest">Interest:</label>
                        <select name="interest" id="interest" multiple value={profileData.interest} onChange={eventHandler} >
                            <option value="sports">Sports</option>
                            <option value="art_and_craft">Art & Craft</option>
                            <option value="music">Music</option>
                            <option value="reading">Reading</option>
                            <option value="gardening">Gardening</option>
                            <option value="swimming">Swimming</option>
                            <option value="cycling">Cycling</option>
                            <option value="parks">Parks</option>
                            <option value="drawing_and_painting">Drawing & Painting</option>
                        </select>

                        <label htmlFor="availability">Availability:</label>
                        <select name="availability" id="availability" multiple value={profileData.availability} onChange={eventHandler} >
                            <option value="weekend">Weekend</option>
                            <option value="weekdays">Weekdays</option>
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="evening">Evening</option>
                        </select>

                        <label htmlFor="additional_info">Additional Information:</label>
                        <textarea id="additional_info" name="additional_info" rows="4" cols="1" placeholder="Enter any other relevant information here" value={profileData.additional_info || ''} onChange={eventHandler}   ></textarea>

                        <input type="submit" />
                    </section>
                </form>

            </div>
        </div>
    )
}
export default profile