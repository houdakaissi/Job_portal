


import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function AddJob() {
  const [storedId, setStoredId] = useState('');
  const [storedCity, setStoredCity] = useState('');
  const [formData, setFormData] = useState({
    company_id: '', // Initially empty; will be set later
    description: '',
    salary_level: '',
    city: '',
    country: '',
    education_level: '',
    language_levels: [] // Changed to array for checkboxes
  });

  const [message, setMessage] = useState('');

  const salaryLevels = ['Entry', 'Mid', 'Senior', 'Lead'];
  const educationLevels = ['High School', 'Associate Degree', 'Bachelor’s Degree', 'Master’s Degree', 'PhD'];
  const availableLanguages = ['English', 'Spanish', 'French', 'German', 'Chinese']; // Example languages

  useEffect(() => {
    // Retrieve the ID and city from localStorage
    const id = localStorage.getItem('id');
    const city = localStorage.getItem('city');

    if (id) {
      setStoredId(id);
      setFormData(prevData => ({
        ...prevData,
        company_id: id // Update formData with storedId
      }));
    }

    if (city) {
      setStoredCity(city);
      setFormData(prevData => ({
        ...prevData,
        city: city // Update formData with storedCity
      }));
    }
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const updatedFormData = { ...prevData, [name]: value };

      // Optionally update localStorage if the field is 'city'
      if (name === 'city') {
        localStorage.setItem('city', value);
      }

      return updatedFormData;
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevData => {
      const updatedLanguages = checked
        ? [...prevData.language_levels, value]
        : prevData.language_levels.filter(lang => lang !== value);

      return { ...prevData, language_levels: updatedLanguages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      language_levels: formData.language_levels
    };

    try {
      //const response = await fetch('http://localhost:80/addjob.php', {
        const response = await fetch('http://localhost:3001/addjob', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
       
      const result = await response.text();
      
      setMessage(result);
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Submit Job Advertisement</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="company_id">Company ID</label>
          <input
            type="number"
            id="company_id"
            name="company_id"
            value={formData.company_id} // Use formData's company_id
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="salary_level">Salary Level</label>
          <select
            id="salary_level"
            name="salary_level"
            value={formData.salary_level}
            onChange={handleChange}
            required
          >
            <option value="">Select Salary Level</option>
            {salaryLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="education_level">Education Level</label>
          <select
            id="education_level"
            name="education_level"
            value={formData.education_level}
            onChange={handleChange}
            required
          >
            <option value="">Select Education Level</option>
            {educationLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Language Levels</label>
          {availableLanguages.map(language => (
            <div key={language}>
              <label>
                <input
                  type="checkbox"
                  value={language}
                  checked={formData.language_levels.includes(language)}
                  onChange={handleCheckboxChange}
                />
                {language}
              </label>
            </div>
          ))}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div>
          <p>{message}</p>
        </div>
      </form>
    </div>
  );
}

export default AddJob;





/*
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
function AddJob() {
  // Initialize state for storedId
  const [storedId, setStoredId] = useState('');
  const [storedCity, setStoredCity] = useState('');
  // Initialize formData state with an empty object
  const [formData, setFormData] = useState({
    company_id: '', // Initially empty; will be set later
    description: '',
    salary_level: '',
    city: '',
    country: '',
    education_level: '',
    language_levels: [] // Changed to array for checkboxes
  });

  const [message, setMessage] = useState('');

  // Define options for salary and education levels
  const salaryLevels = ['Entry', 'Mid', 'Senior', 'Lead'];
  const educationLevels = ['High School', 'Associate Degree', 'Bachelor’s Degree', 'Master’s Degree', 'PhD'];
  const availableLanguages = ['English', 'Spanish', 'French', 'German', 'Chinese']; // Example languages

  // Effect to initialize storedId from localStorage and update formData
  useEffect(() => {
    localStorage.setItem('id',setStoredCity);
    const id = localStorage.getItem('id');
    console.log('Stored IDddd:', id);
    if (id) {
      setStoredId(id); // Set storedId state
      setFormData(prevData => ({
        ...prevData,
        company_id: id // Update formData with storedId
      }));
    }
  }, []); // Empty dependency array ensures this runs once on component mount

 

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevData => {
      const updatedLanguages = checked
        ? [...prevData.language_levels, value]
        : prevData.language_levels.filter(lang => lang !== value);

      return { ...prevData, language_levels: updatedLanguages };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      language_levels: formData.language_levels
    };

    try {
      const response = await fetch('http://localhost:80/addjob.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.text();
      setMessage(result);
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };

  return (
  
    <div>
          <Navbar />
      <h1>Submit Job Advertisement</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="company_id">Company ID</label>
          <input
            type="number"
            id="company_id"
            name="company_id"
           // value={formData.company_id} // Use formData's company_id
           value={storedId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="salary_level">Salary Level</label>
          <select
            id="salary_level"
            name="salary_level"
            value={formData.salary_level}
            onChange={handleChange}
            required
          >
            <option value="">Select Salary Level</option>
            {salaryLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="education_level">Education Level</label>
          <select
            id="education_level"
            name="education_level"
            value={formData.education_level}
            onChange={handleChange}
            required
          >
            <option value="">Select Education Level</option>
            {educationLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Language Levels</label>
          {availableLanguages.map(language => (
            <div key={language}>
              <label>
                <input
                  type="checkbox"
                  value={language}
                  checked={formData.language_levels.includes(language)}
                  onChange={handleCheckboxChange}
                />
                {language}
              </label>
            </div>
          ))}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div>
          <p>{message}</p>
        </div>
      </form>
    </div>
  );
}

export default AddJob;
*/


/*
 
import React, { useState } from 'react';
import axios from 'axios';

function AddJob(){
 
    const [formData, setFormData] = useState({
        company_id: '',
        description: '',
        salary_level: '',
        city: '',
        country: '',
        education_level: '',
        language_levels: [] // Changed to array for checkboxes
      });
    
      const [message, setMessage] = useState('');
      const id = localStorage.getItem('id');
      // Define options for salary and education levels
      const salaryLevels = ['Entry', 'Mid', 'Senior', 'Lead'];
      const educationLevels = ['High School', 'Associate Degree', 'Bachelor’s Degree', 'Master’s Degree', 'PhD'];
      const availableLanguages = ['English', 'Spanish', 'French', 'German', 'Chinese']; // Example languages
    
      // Handle input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      // Handle checkbox changes
      const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prevData => {
          const updatedLanguages = checked
            ? [...prevData.language_levels, value]
            : prevData.language_levels.filter(lang => lang !== value);
    
          return { ...prevData, language_levels: updatedLanguages };
        });
      };
    
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const dataToSend = {
          ...formData,
          language_levels: formData.language_levels
        };
    
        try {
          const response = await fetch('http://localhost:80/addjob.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
          });
    
          const result = await response.text();
          setMessage(result);
        } catch (error) {
          setMessage('An error occurred: ' + error.message);
        }
      };
    
      return (
        <div>
          <h1>Submit Job Advertisement</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="company_id">Company ID</label>
              <input
                type="number"
                id="company_id"
                name="company_id"
                value={id}
               // value={formData.company_id}
               value={formData.company_id}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="salary_level">Salary Level</label>
              <select
                id="salary_level"
                name="salary_level"
                value={formData.salary_level}
                onChange={handleChange}
                required
              >
                <option value="">Select Salary Level</option>
                {salaryLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="education_level">Education Level</label>
              <select
                id="education_level"
                name="education_level"
                value={formData.education_level}
                onChange={handleChange}
                required
              >
                <option value="">Select Education Level</option>
                {educationLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Language Levels</label>
              {availableLanguages.map(language => (
                <div key={language}>
                  <label>
                    <input
                      type="checkbox"
                      value={language}
                      checked={formData.language_levels.includes(language)}
                      onChange={handleCheckboxChange}
                    />
                    {language}
                  </label>
                </div>
              ))}
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
            <div>
              <p>{message}</p>
            </div>
          </form>
        </div>
      );
}
export default AddJob;
*/