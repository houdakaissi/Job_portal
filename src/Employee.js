import './Employee.css';
 
import './Candidate.css';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { loginCallback } from './authUtils';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
function Employee() {
   const { username, login } = useAuth();
 

 


   const [isSignUp, setIsSignUp] = useState(false);
   const [isSignIn, setIsSignIn] = useState(true);
   const [userName, setUserName] = useState('');
   const handleLoginInputChange = (e) => {
     const { name, value } = e.target;
     setLoginObj({ ...loginObj, [name]: value });
   };
   const signUpObjInitialState = {
     username: '',
    
     password: '',
     presentation_text: '',
     address: '',
     zip_code: '',
     city: '',
    country: '',
     phone: '',
    email: '',
    
     logo_path: null,
   };
 
   const loginObjInitialState = {
     email: '',
     password: ''
   };
 
   const [signUpObj, setSignUpObj] = useState(signUpObjInitialState);
   const [loginObj, setLoginObj] = useState(loginObjInitialState);
 
 
 
 const onRegister = () => {
     fetch('http://localhost:80/registerEmployee.php', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(signUpObj),
     })
     .then(response => response.json())
     .then(data => {
       alert(data.message); // Show success message from PHP
       // Optionally, you can reset the form fields here
       setSignUpObj(signUpObjInitialState);
     })
     .catch(error => {
       console.error('Error:', error);
       alert('Registration failed');
     });
   };
  
   
    
 const navigate=useNavigate();
 
 const onLogin = () => {
     fetch('http://localhost:80/loginEmployee.php', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             email: loginObj.email,
             password: loginObj.password,
         }),
     })
     .then(response => response.json())
     .then(data => {
         console.log(data); // Handle response from PHP script
 
         if (data.success) {
             console.log('Logged in as:', data.username);
             localStorage.setItem('username', data.username);
             localStorage.setItem('id', data.id);
           const id=  localStorage.getItem('id');
           console.log(id);
             localStorage.setItem('presentation_text', data.presentation_text);
            // console.log('languages:', data.languages);
          /*   data.languages.forEach(lang => {
               console.log(`Language: ${lang.language}, Level: ${lang.level}`);
             });
             */
             login(data.username); 
             
  /*
   
             localStorage.setItem('username', data.username);
            // localStorage.setItem('email', data.email);
             localStorage.setItem('password', data.password);
             localStorage.setItem('dob', data.dob);
             localStorage.setItem('sex', data.sex);
             localStorage.setItem('phone', data.phone);
             localStorage.setItem('countryCode', data.countryCode);
             localStorage.setItem('jobInterest', data.jobInterest);
             localStorage.setItem('educationLevel', data.educationLevel);
             localStorage.setItem('nationality', data.nationality);
             const a = localStorage.getItem('phone');
             */
 //console.log(a);
  /*   
 const languages = [
   { language: 'French', level: 'Basic' },
   { language: 'English', level: '' }
 ];
 
 // Convert array to JSON string and store in localStorage
 localStorage.setItem('languagess', JSON.stringify(languages));
 */
      /* 
 const storedLanguagesString = localStorage.getItem('languages');
 //const storedLanguages = storedLanguagesString ? JSON.parse(storedLanguagesString) : [];
 
 console.log('Stored Languages:', storedLanguagesString);
 const storede = localStorage.getItem('sex');
 console.log('Storddddddded Data:', storede);
 // Retrieve data from localStorage
 const storedLanguages = localStorage.getItem('languages');
 
 let languagess = [];
 
 try {
     // Parse JSON string back to JavaScript array of objects
     languagess = JSON.parse(storedLanguages) || [];
 } catch (error) {
     console.error('Error parsing languages from localStorage:', error);
 }
 
 // Ensure languages is an array before iterating
 if (Array.isArray(languagess)) {
     // Iterate over languages array
     languagess.forEach(lang => {
         console.log(`Language: ${lang.language}, Level: ${lang.level}`);
     });
 } else {
     console.error('Invalid data retrieved from localStorage:', storedLanguages);
 }
 */
 
 
   
    
             loginCallback(data.username); 
         
             navigate("/home");
            // window.location.href = data.redirect || '/home';
         } else {
             // Handle unsuccessful login (show error message, etc.)
             console.error('Login failed:', data.message);
         }
     })
     .catch(error => {
         console.error('Error:', error);
     });
 };
 
 useEffect(() => {
   // Retrieve data from localStorage
   const storedData = localStorage.getItem('signUpObjInitialState');
   
   // Parse JSON string to JavaScript object
   if (storedData) {
     const parsedData = JSON.parse(storedData);
     
     // Access the username property
     console.log('Usernameeeeee:', parsedData.username);
   }
 }, []);
 
 
 
 
 
   const toggleForm = () => {
     setIsSignUp(false); // Show sign-in form
     setIsSignIn(true); // Hide sign-up form
   };
 
   const toggleForm1 = () => {
     setIsSignUp(true); // Show sign-up form
     setIsSignIn(false); // Hide sign-in form
   };
  
   const handleFileChange = (e) => {
     setSignUpObj({ ...signUpObj, fileName: e.target.files[0] });
   };
   
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
 
   const handleDateOfBirthChange = (date) => {
     setSignUpObj({ ...signUpObj, dob: date });
   };
   const getCurrentDate = () => {
     const today = new Date();
     const month = (today.getMonth() + 1).toString().padStart(2, '0');
     const day = today.getDate().toString().padStart(2, '0');
     const year = today.getFullYear();
     return `${year}-${month}-${day}`;
   };
 
  return (
    <div className="parent">
      <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
 
                {/* Rest of your form and toggle logic */}
              
        <div className={`form-container sign-up ${isSignUp ? 'active' : ''}`}>
          <form>
            <h1>Céer un compte</h1>
            <span>Utilisez votre adresse e-mail pour l'inscription</span>
            <input
              type="text"
              name="username"
             // value={signUpObj.username}
              onChange={(e) => setSignUpObj({ ...signUpObj, username: e.target.value })}
              placeholder="Username"
            />
         
            <input
              type="password"
              name="password"
             // value={signUpObj.password}
              onChange={(e) => setSignUpObj({ ...signUpObj, password: e.target.value })}
              placeholder="Password"
            />
            <input
              type="text"
              name="presentation_text"
              
            //  value={signUpObj.dob}
             // onChange={handleDateOfBirthChange}
              onChange={(e) => setSignUpObj({ ...signUpObj, presentation_text: e.target.value })}
              placeholder=" TEXT"
            />
            <input
              type="text"
              name="address"
              
              onChange={(e) => setSignUpObj({ ...signUpObj, address: e.target.value })}
              placeholder="address"
            />
            <div className="phone-input">
              <input
                type="text"
                name="zip_code"
              //  value={signUpObj.phone}
                onChange={(e) => setSignUpObj({ ...signUpObj, zip_code: e.target.value })}
                placeholder="zip code"
              />
              <input
                type="text"
                name="city"
                //value={signUpObj.countryCode}
                onChange={(e) => setSignUpObj({ ...signUpObj, city: e.target.value })}
                placeholder="city"
              />
            </div>
            <input
              type="text"
              name="country"
            //  value={signUpObj.jobInterest}
              onChange={(e) => setSignUpObj({ ...signUpObj, country: e.target.value })}
              placeholder="country "
            />
               <input
              type="text"
              name="email"
             // value={signUpObj.jobInterest}
              onChange={(e) => setSignUpObj({ ...signUpObj, email: e.target.value })}
              placeholder="email "
            />
              <input
              type="text"
              name="phone"
             // value={signUpObj.jobInterest}
              onChange={(e) => setSignUpObj({ ...signUpObj, phone: e.target.value })}
              placeholder="phone"
            />
          
            
           
          
            <input type="file" name="logo"   onChange={(e) => setSignUpObj({ ...signUpObj, logo_path: e.target.value })} />

            <button type="button" onClick={onRegister}>
              S'inscrire
            </button>
          </form>
        </div>
        <div className={`form-container sign-in ${isSignIn ? 'active' : ''}`}>
      
        <form>
            <h1>Connexion</h1>
            <input
              type="email"
              name="email"
              value={loginObj.email}
              onChange={handleLoginInputChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={loginObj.password}
              onChange={handleLoginInputChange}
              placeholder="Password"
            />
            <button type="button" onClick={onLogin}>
              Se connecter
            </button>
        </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className={`toggle-panel toggle-left ${isSignIn ? 'active' : ''}`}>
              <h1>Bienvenue!</h1>
              <p>Entrez vos coordonnées personnelles pour utiliser toutes les fonctionnalités du site</p>
              <button type="button" className="hidden" id="login" onClick={toggleForm}>
                Se connecter
              </button>
            </div>
            <div className={`toggle-panel toggle-right ${isSignUp ? 'active' : ''}`}>
              <h1>Bonjour!</h1>
              <p>Inscrivez-vous avec vos coordonnées personnelles pour utiliser toutes les fonctionnalités du site</p>
              <button type="button" className="hidden" id="register" onClick={toggleForm1}>
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;
