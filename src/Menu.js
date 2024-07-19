import React from 'react';
import './Menu.css';

function Menu() {
    return (
        <div   className="menu-container">
            <div className="menu-container">
            <div className="menu-item">
                <img src=" https://media.jamf.com/images/Industries/macbook-pro-office-53-full-bleed.jpg?q=80&w=2000" alt="Image 1" />
                <div className="centered"><h1>CREATE YOUR FUTURE</h1>
                <h3>Find your next job</h3>
                <div className="search-container">
                <input type="text" placeholder="Search..." />
                <button type="submit">Discover</button>
            </div>
                </div>
            </div>
            
            
        </div>
        </div>
    );
}

export default Menu;
