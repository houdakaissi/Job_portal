import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function SeeJob() {
    const [companyId, setCompanyId] = useState(1); // Default ID for demonstration
    const [jobData, setJobData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const a=localStorage.getItem('id');
        console.log("ggggg",a);
      // Fetch job details based on company_id
      const fetchJobDetails = async () => {
        try {
          const response = await fetch(`http://localhost/get_job_data.php?company_id=${a}`);
          const data = await response.json();
          
          if (response.ok) {
            setJobData(data);
          } else {
            setError(data.message);
          }
        } catch (error) {
          setError('An error occurred: ' + error.message);
        }
      };
  
      fetchJobDetails();
    }, [companyId]); 

    return (
        <div>
      <Navbar />
 
      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {jobData ? (
          <ul>
            {jobData.map((job, index) => (
              <li key={index}>
                <h2>Description</h2>
                <p>{job.description}</p>
                <h2>Salary Level</h2>
                <p>{job.salary_level}</p>
                <h2>City</h2>
                <p>{job.city}</p>
                <h2>Country</h2>
                <p>{job.country}</p>
                <h2>Education Level</h2>
                <p>{job.education_level}</p>
                <h2>Language Levels</h2>
                <p>{job.language_levels}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No job data available.</p>
        )}
      </div>
    </div>
    );
}

export default SeeJob;
