
/*
import React from 'react';
import './Navbar.css';
import { useAuth } from './AuthContext';

function Navbar() {

    // Assuming 'username' is set somewhere in your login logic
 

    const { username } = useAuth();
   // const Navbar= ({ passedValue }) => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
           
                JobSeek
            </div>
            <ul className="navbar-nav">
                <li className="em">
                    <button>For employees</button>
                </li>
                {username ? (
                    // User is logged in, show user name and logout button
                    <>
                        <li className="user-name">
                            {username}
                        </li>
                        <li className="logout">
                            <button>Logout</button>
                        </li>
                    </>
                ) : (
                    // User is not logged in, show signup button
                    <li className="signup">
                        <button>Signup</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}


export default Navbar;


 





*/
/*

import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useAuth } from './AuthContext';

function Navbar() {
    const { username } = useAuth(); // Assuming useAuth provides username through context or state

    // State to hold username for rendering
    const [storedUsername, setStoredUsername] = useState('');

    // Effect to initialize storedUsername from localStorage on component mount
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setStoredUsername(storedUsername);
        }
    }, []);

    // Effect to update storedUsername whenever username changes
    useEffect(() => {
        setStoredUsername(username || ''); // Ensure username is not undefined
        if (username) {
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
    }, [username]);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                JobSeek
            </div>
            <ul className="navbar-nav">
                <li className="em">
                    <button>For employees</button>
                </li>
                {storedUsername ? (
                    // User is logged in, show user name and logout button
                    <>
                        <li className="user-name">
                            {storedUsername}
                        </li>
                        <li className="logout">
                            <button>Logout</button>
                        </li>
                    </>
                ) : (
                    // User is not logged in, show signup button
                    <li className="signup">
                        <button>Signup</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
*/










import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Navbar() {
    // Assuming you have a state for username
    const [showOptions, setShowOptions] = useState(false);

    const handleProfile = () => {
        // Handle profile navigation or display logic
        console.log('Profile logic here');
    };


    const [presentationText, setPresentationText] = useState('');
    const [Id, setId] = useState('');
    const { username } = useAuth(); // Assuming useAuth provides username through context or state

    // State to hold username for rendering
    const [storedUsername, setStoredUsername] = useState('');

    // Effect to initialize storedUsername from localStorage on component mount
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const presentation = localStorage.getItem('presentation_text');
        const id = localStorage.getItem('id');
        console.log(id);
      
        setPresentationText(presentation || '');
        if (storedUsername) {
            setStoredUsername(storedUsername);
        }
    }, []);

    // Effect to update storedUsername whenever username changes
    useEffect(() => {
        if (username) {
            setStoredUsername(username);
            localStorage.setItem('username', username);
        } else {
            setStoredUsername('');
           localStorage.removeItem('username');
    
        }
    }, [username]);

    // Function to handle logout
    const handleLogout = () => {
        // Clear username from state and localStorage
        localStorage.clear();
        setStoredUsername('');
        localStorage.removeItem('username');
        // Implement any additional logout logic (e.g., redirect)
        // Example: window.location.href = '/logout';
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                JobSeek
            </div>
            {presentationText &&   storedUsername && (
             
                                        <>
            <div className="presentation-text">
                      <Link to="/addjob"> Add jobs:</Link>     {presentationText }
                        </div>
                        <div className="presentation-text">
                        <Link to="/seejob"> see my jobs:  </Link>   {presentationText }
                        </div>
                        <div className="presentation-text">
                        <Link to="/applications"> Applications:  </Link>   {presentationText }
                        </div>  
                        </>
                                    )}
            <ul className="navbar-nav">
            <li className="em">
                    <button>For employees</button>
                </li>
                {storedUsername ? (
                    // User is logged in, show user name and logout button
                    <>
                    <li className="appi">
                           My Applications
                        </li>
                        <li className="user-name " onClick={() => setShowOptions(!showOptions)}>
                            {storedUsername}
                            {showOptions && (
                <ul className="options">
                    <li className="logout">
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                 
                    <li className="profile">
                    <Link to="/home/profile">Profile</Link>
                    </li>
                </ul>
            )}
                        </li>
                        <li className="logout">
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    // User is not logged in, show signup button
                    <li className="signup">
                        <button  >Signup</button>
                        
                     
                
                    </li>
                 

                )}
            </ul>
        </nav>
    );
}

export default Navbar;
