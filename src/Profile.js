  
import Navbar from './Navbar';
import './Profile.css'; // Import your CSS file
import React, { useEffect, useState } from 'react';
const Profile = () => {

    const handleInputChange = (key, value) => {
        setSignUpObj({ ...signUpObj, [key]: value });
      };
    
      // Handler for file upload (placeholder, needs actual implementation)
    
    
      // Handler for form submission
    /*  const onRegisterr = () => {
        // Implement your form submission logic here
        console.log('Form submitted:', signUpObj);
        // Example: Update table or send data to server
        // Example: Update localStorage with signUpObj
        localStorage.setItem('signUpObjInitialState', JSON.stringify(signUpObj));
        alert('Registration Successful!');
        // Optionally reset form after submission
        setSignUpObj({
          username: '',
          email: '',
          password: '',
          dob: '',
          sex: '',
          phone: '',
          countryCode: '',
          jobInterest: '',
          educationLevel: '',
          nationality: '',
          languages: [{ language: '', level: '' }],
        });
      };
    */
      const onRegisterr = () => {
        // Send data to backend (PHP endpoint)
        fetch('http://localhost:80/update_candidate.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signUpObj),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
            alert('Profile updated successfully!');
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('Failed to update profile.');
          });
      };
 
  const c= localStorage.getItem('username');
 
    const b= localStorage.getItem('password');
    console.log(b);
    const a = localStorage.getItem('email');

    const k = localStorage.getItem('dob');
    const d= localStorage.getItem('sex');
    const e= localStorage.getItem('phone');
    const f= localStorage.getItem('countryCode');
    const g= localStorage.getItem('jobInterest');
     const t=localStorage.getItem('educationLevel');
    const u= localStorage.getItem('nationality');
    const m= localStorage.getItem('languages');
  
    useEffect(() => {
        // Retrieve userData from localStorage or API
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }  
      }, []);
      




      const [signUpObj, setSignUpObj] = useState({
    
        username: '',
        email: '',
        password: '',
        dob: '',
        sex: '',
        phone: '',
        countryCode: '',
        jobInterest: '',
        educationLevel: '',
        nationality: '',
        languages: [{ language: '', level: '' }], // Assuming this is an array of objects
      });
      useEffect(() => {
        // Retrieve signUpObjInitialState from localStorage
        const storedData = localStorage.getItem('signUpObjInitialState');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setSignUpObj(parsedData);
        }
      }, []); // Empty dependency array ensures this effect runs once on component mount
    
      // Handlers for input changes
    
    
      // Example handler for username change
      const handleUsernameChange = (e) => {
        const username = e.target.value;
        handleInputChange('username', username);
      };
    
      // Example handler for email change
      const handleEmailChange = (e) => {
        const email = e.target.value;
        handleInputChange('email', email);
      };

 // const [signUpObj, setSignUpObj] = useState({
    const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    dob: '',
    sex: '',
    phone: '',
    countryCode: '',
    jobInterest: '',
    educationLevel: '',
    nationality: '',
    languages: [{ language: '', level: '' }], // Assuming this is an array of objects
  });

  // Handler for updating date of birth
  const handleDateOfBirthChange = (e) => {
    setSignUpObj({ ...signUpObj, dob: e.target.value });
  };

  // Handler for languages change
  
  const handleLanguageChange = (language) => (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const updatedLanguages = signUpObj.languages.map((lang) =>
      lang.language === language
        ? { ...lang, checked: target.type === 'checkbox' ? value : lang.checked, level: target.type === 'checkbox' ? lang.level : value }
        : lang
    );
    setSignUpObj({ ...signUpObj, languages: updatedLanguages });
  };

  // Handler for file upload
  const handleFileChange = (e) => {
    // Handle file upload logic here
    console.log('File uploaded:', e.target.files[0]);
  };

  // Handler for form submission
  const onRegister = () => {
    // Implement your form submission logic here
    console.log('Form submitted:', signUpObj);
  };

  return (
    <div className="wrapper bg-white mt-sm-5">
      <Navbar />
      <h4 className="pb-4 border-bottom">Account settings</h4>
      <div className="d-flex align-items-start py-3 border-bottom">
        <img
          src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          className="img"
          alt=""
        />
        <div className="pl-sm-4 pl-2" id="img-section">
          <b>Profile Photo</b>
          <p>Accepted file type .png. Less than 1MB</p>
          <button className="btn button border">
            <b>Upload</b>
          </button>
        </div>
      </div>
      <div className="py-2">
        <div className="row py-2">
          <div className="col-md-6">
          <input
              type="text"
              name="username"
             // value={c}
             value= {signUpObj.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
             // value={a}
             value= {signUpObj.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              //value={b}
              value= {signUpObj.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Password"
            />
            <input
              type="text"
              name="dob"
              value= {signUpObj.dob}
             // value={k}
             // onChange={handleDateOfBirthChange}
             onChange={(e) => handleInputChange('dob', e.target.value)}
              placeholder=" (DD/MM/YYYY)"
            />
            <input
              type="text"
              name="sex"
              //value={d}
              value= {signUpObj.sex}
              onChange={(e) => handleInputChange('sex', e.target.value)}
              placeholder="Sex"
            />
            <div className="phone-input">
              <input
                type="text"
                name="phone"
              //  value={e}
             value= {signUpObj.phone}
                onChange={(e) => setSignUpObj({ ...signUpObj, phone: e.target.value })}
                placeholder="Phone Number"
              />
              <input
                type="text"
                name="countryCode"
                value= {signUpObj.countryCode}
                //value={f}
                onChange={(e) => handleInputChange('countryCode', e.target.value)}
                placeholder="Country Code"
              />
            </div>
            <input
              type="text"
              name="jobInterest"
              value= {signUpObj.jobInterest}
            //  value={g}
              onChange={(e) => handleInputChange('jobInterest', e.target.value)}
              placeholder="Job Interest"
            />
            <select
              name="educationLevel"
              value= {signUpObj.educationLevel}
             // value={t}
              onChange={(e) => handleInputChange('educationLevel', e.target.value)}
            >
              <option value="">Select Education Level</option>
              <option value="High School">High School</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="PhD">PhD</option>
            </select>
            <input
              type="text"
              name="nationality"
              value= {signUpObj.nationality}
             // value={u}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
              placeholder="Nationality"
            />
             <span>Languages:</span>
              {signUpObj.languages.map((lang) => (
                <div key={lang.language}>
                  <label>
                    <input
                      type="checkbox"
                      name="languages"
                      //
                      checked={m.checked}
                      value={m.language}
                      //checked={signUpObj.languages.some((l) => l.language === lang.language)}
                     // onChange={handleLanguageChange(lang.language)}
                     onChange={(e) => handleInputChange('sex', e.target.value)}
                    />{' '}
                    {lang.language}
                  </label>
                  <select
                    value={m.level}
                  //  onChange={handleLanguageChange(lang.language)}
                 onChange= {(e) => handleInputChange('sex', e.target.value)}
                    disabled={!lang.checked}
                  >
                    <option value="">Select proficiency level</option>
                    <option value="Basic">Basic</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Native">Native</option>
                  </select>
                </div>
              ))}
            </div>
            <input type="file" onChange={handleFileChange} />
          </div>
        </div>
        <div className="py-3 pb-4 border-bottom">
          <button className="btn btn-primary mr-3" onClick={onRegisterr}>
            Register
          </button>
          <button className="btn border button">Cancel</button>
        </div>
        <div className="d-sm-flex align-items-center pt-3" id="deactivate">
          <div>
            <b>Deactivate your account</b>
            <p>Details about your company account and password</p>
          </div>
          <div className="ml-auto">
            <button className="btn danger">Deactivate</button>
          </div>
        </div>
      </div>
    
  );
};

export default Profile;

