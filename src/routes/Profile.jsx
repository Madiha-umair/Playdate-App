import { useState } from 'react';
import Nav from "../components/Nav";

const profile = () => {
    const [profileData, setProfileData] = useState({
        user_id: '',
        child_name:'',
        age:'',
        picture:''
    })


    const onSubmit = () => {
        console.log('Submitted!');
    }

    const handleChange = () => {
        console.log('Changed!');
    }
        /* save all inputs to state*/
    return (
        <div>
            <Nav setShowAuth={() => { }} showAuth={false} />
            <div className="profile">
                <h2>Create Account</h2>
                <form >
                    <section>
                        <label for="picture">Upload Picture:</label>
                        <input type="file" id="picture" name="picture" accept="image/*" />
                        <label for="child name">Child's Name</label>
                        <input type="text" name="child-name" id="child-name" placeholder="Child Name" required={true} value={""} onChange={handleChange} />
                        <label for="age">Age</label>
                        <input type="number" name="age" id="age" placeholder="Age" required={true} value={""} onChange={handleChange} />

                        <label>Gender</label>
                        <div>
                            <input type="radio" name="gender" id="girl" required={true} value="girl" onChange={handleChange} checked={false} />
                            <label for="girl">Girl</label>
                            <input type="radio" name="gender" id="boy" required={true} value="boy" onChange={handleChange} checked={false} />
                            <label for="boy">Boy</label>
                            <input type="radio" name="gender" id="other" required={true} value="other" onChange={handleChange} checked={false} />
                            <label for="other">Other</label>
                        </div>

                        <label for="city">City</label>
                        <input type="text" name="city" id="city" placeholder="City" required={true} value={""} onChange={handleChange} />
                        <label for="country">Country</label>
                        <input type="text" name="country" id="country" placeholder="Country" required={true} value={""} onChange={handleChange} />
                        <label for="languages">Languages</label>
                        <input type="text" name="languages" id="languages" placeholder="Languages" required={true} value={""} onChange={handleChange} />

                        <label for="show-matches">Show matches in city:</label>
                        <input type="text" name="show-matches" id="show-matches" placeholder="City Name" required={true} value={""} onChange={handleChange} />

                        <label for="interest">Interest:</label>
                        <select name="interest" id="interest" multiple>
                            <option value="sports">Sports</option>
                            <option value="art">Art & Craft</option>
                            <option value="music">Music</option>
                            <option value="reading">Reading</option>
                            <option value="gardening">Gardening</option>
                            <option value="swimming">Swimming</option>
                            <option value="cycling">Cycling</option>
                            <option value="parks">Parks</option>
                            <option value="drawing">Drawing & Painting</option>
                        </select>

                        <label for="availability">Availability:</label>
                        <select name="availability" id="availability" multiple>
                            <option value="weekend">Weekend</option>
                            <option value="weekdays">Weekdays</option>
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="evening">Evening</option>
                        </select>

                        <label for="additional-info">Additional Information:</label>
                        <textarea id="additional-info" name="additional-info" rows="4" cols="1" placeholder="Enter any other relevant information here"></textarea>

                        <input type="submit" />
                    </section>
                </form>

            </div>
        </div>
    )
}
export default profile