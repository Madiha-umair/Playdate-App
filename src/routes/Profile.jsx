import { useState } from 'react';
import Nav from "../components/Nav";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const profile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
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
    show_matches: '',
    interest: [],
    availability: [],
    additional_info: '',
    matches: [],
  });

  let navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      /*  to store the picture with its original file extension

      const fileExtension = profileData.picture.name.split('.').pop(); // Get the original file extension
      formData.append('picture', profileData.picture, `picture.${fileExtension}`);*/

      const formData = new FormData();
      formData.append('picture', profileData.picture, 'picture.jpg');

      for (const key in profileData) {
        if (key !== 'picture' && key !== 'picturePreview') {
          formData.append(key, profileData[key]);
        }
      }

      const response = await axios.put('http://localhost:8888/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("here is the response:", response);
      const success = response.status === 200;
      if (success) navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  const eventHandler = (event) => {
    const { name, options, files } = event.target;

    if (name === 'picture') {
      const uploadedFile = files[0];

      if (uploadedFile) {
        // Generate a preview URL for the selected image
        const reader = new FileReader();
        reader.onload = () => {
          setProfileData((prevState) => ({
            ...prevState,
            picture: uploadedFile,
            picturePreview: reader.result,
          }));
        };
        reader.readAsDataURL(uploadedFile);
      } else {
        // Clear the picture and picturePreview fields if no image is selected
        setProfileData((prevState) => ({
          ...prevState,
          picture: null,
          picturePreview: null,
        }));
      }
    } else if (name === 'availability' || name === 'interest') {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setProfileData((prevState) => ({
        ...prevState,
        [name]: [...prevState[name], ...selectedValues],
      }));
    } else {
      const { value } = event.target;
      // Handle the "matches" field separately
      if (name === 'matches') {
        setProfileData((prevState) => ({
          ...prevState,
          [name]: [], // Set "matches" field as an empty array
        }));
      } else {
        setProfileData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };
  console.log("here is profile data:", profileData);

  return (
    <div>
      <Nav setShowAuth={() => { }} showAuth={false} />
      <div className="profile">
        <h2>Create Account</h2>
        <form onSubmit={submitHandler}>

          <section>
            <label htmlFor="picture">Upload Picture:</label>
            <input
              type="file"
              id="picture"
              name="picture"
              accept="image/*"
              onChange={eventHandler}
            />
            {profileData.picturePreview && (
              <img
                src={profileData.picturePreview}
                alt="Selected Image Preview"
                style={{ width: '200px', height: '200px' }}
              />
            )}
            <label htmlFor="child_name">Child's Name</label>
            <input type="text" name="child_name" id="child_name" placeholder="Child Name" required={true} value={profileData.child_name} onChange={eventHandler} />
            <label htmlFor="age">Age</label>
            <input type="number" name="age" id="age" placeholder="Age" required={true} value={profileData.age} onChange={eventHandler} />

            <label>Gender</label>
            <div>
              <input type="radio" name="gender" id="girl" required={true} value="girl" onChange={eventHandler} checked={profileData.gender === "girl"} />
              <label htmlFor="girl">Girl</label>
              <input type="radio" name="gender" id="boy" required={true} value="boy" onChange={eventHandler} checked={profileData.gender === "boy"} />
              <label htmlFor="boy">Boy</label>
              <input type="radio" name="gender" id="other" required={true} value="other" onChange={eventHandler} checked={profileData.gender === "other"} />
              <label htmlFor="other">Other</label>
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
