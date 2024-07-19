import './Candidate.css';
import Navbar from './Navbar';
import { loginCallback } from './authUtils';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

function Candidate() {
  const { username, login } = useAuth();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [userName, setUserName] = useState('');
  const [signUpObj, setSignUpObj] = useState({
    id: '',
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
    languages: [
      { language: 'French', checked: false, level: '' },
      { language: 'English', checked: false, level: '' }
    ],
  });
  const [loginObj, setLoginObj] = useState({ email: '', password: '' });

  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguageChange = (language) => (event) => {
    const { type, checked, value } = event.target;
    setSignUpObj((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) =>
        lang.language === language
          ? {
              ...lang,
              checked: type === 'checkbox' ? checked : lang.checked,
              level: type === 'checkbox' ? lang.level : value,
            }
          : lang
      ),
    }));
  };

  const handleFileChange = (e) => {
    setSignUpObj((prev) => ({ ...prev, fileName: e.target.files[0] }));
  };

  const handleDateOfBirthChange = (date) => {
    setSignUpObj((prev) => ({ ...prev, dob: date }));
  };

  const onRegister = () => {
    fetch('http://localhost:80/registerCandidate.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signUpObj),
    })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      setSignUpObj({
        id: '',
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
        languages: [
          { language: 'French', checked: false, level: '' },
          { language: 'English', checked: false, level: '' }
        ],
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Registration failed');
    });
  };

  const onLogin = () => {
    fetch('http://localhost:80/loginCandidate.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginObj),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Data received:', data);
      if (data.success) {
        localStorage.setItem('id', data.id);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
        localStorage.setItem('password', data.password);
        localStorage.setItem('dob', data.dob);
        localStorage.setItem('sex', data.sex);
        localStorage.setItem('phone', data.phone);
        localStorage.setItem('countryCode', data.countryCode);
        localStorage.setItem('jobInterest', data.jobInterest);
        localStorage.setItem('educationLevel', data.educationLevel);
        localStorage.setItem('nationality', data.nationality);
        localStorage.setItem('languages', JSON.stringify(data.languages));
const k=localStorage.getItem('id');
console.log(k);
        login(data.username);
        navigate('/home');
      } else {
        console.error('Login failed:', data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    const storedData = localStorage.getItem('signUpObjInitialState');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log('Stored username:', parsedData.username);
    }
  }, []);

  const toggleForm = () => {
    setIsSignUp(false);
    setIsSignIn(true);
  };

  const toggleForm1 = () => {
    setIsSignUp(true);
    setIsSignIn(false);
  };

  return (
    <div className="parent">
      <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
        <div className={`form-container sign-up ${isSignUp ? 'active' : ''}`}>
          <form>
            <h1>Créer un compte</h1>
            <span>Utilisez votre adresse e-mail pour l'inscription</span>
            <input
              type="text"
              name="username"
              value={signUpObj.username}
              onChange={handleInputChange(setSignUpObj)}
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              value={signUpObj.email}
              onChange={handleInputChange(setSignUpObj)}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={signUpObj.password}
              onChange={handleInputChange(setSignUpObj)}
              placeholder="Password"
            />
            <input
              type="text"
              name="dob"
              value={signUpObj.dob}
              onChange={handleInputChange(setSignUpObj)}
              placeholder="Date of Birth (DD/MM/YYYY)"
            />
            <input
              type="text"
              name="sex"
              value={signUpObj.sex}
              onChange={handleInputChange(setSignUpObj)}
              placeholder="Sex"
            />
            <div className="phone-input">
              <input
                type="text"
                name="phone"
                value={signUpObj.phone}
                onChange={handleInputChange(setSignUpObj)}
                placeholder="Phone Number"
              />
              <input
                type="text"
                name="countryCode"
                value={signUpObj.countryCode}
                onChange={handleInputChange(setSignUpObj)}
                placeholder="Country Code"
              />
            </div>
            <input
              type="text"
              name="jobInterest"
              value={signUpObj.jobInterest}
              onChange={handleInputChange(setSignUpObj)}
              placeholder="Job Interest"
            />
            <select
              name="educationLevel"
              value={signUpObj.educationLevel}
              onChange={handleInputChange(setSignUpObj)}
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
              value={signUpObj.nationality}
              onChange={handleInputChange(setSignUpObj)}
              placeholder="Nationality"
            />
            <div className="language-section">
              <span>Languages:</span>
              {signUpObj.languages.map((lang) => (
                <div key={lang.language}>
                  <label>
                    <input
                      type="checkbox"
                      name="languages"
                      checked={lang.checked}
                      onChange={handleLanguageChange(lang.language)}
                    />{' '}
                    {lang.language}
                  </label>
                  <select
                    value={lang.level}
                    onChange={handleLanguageChange(lang.language)}
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
              onChange={handleInputChange(setLoginObj)}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={loginObj.password}
              onChange={handleInputChange(setLoginObj)}
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

export default Candidate;

