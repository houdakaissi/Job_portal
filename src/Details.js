import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import Navbar from './Navbar';
function Details() {
    const a=localStorage.getItem('jobInterest');
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:80/jobsdetails.php?job_id=${id}`) // Use job_id
    
      .then(response => {
        if (!response.ok) {

          throw new Error('Network response was not ok');
        }
        const k=localStorage.getItem('username');
    console.log('yy',k);
        return response.json();

      })
      .then(data => {
        console.log('Fetched job data:', data); // Log the data for inspection
        setJob(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err); // Log the error
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
        <Navbar />
      {job ? (
        <div>
          <h2>{job.description || 'No Description Available'}</h2>
          <p><strong>Salary Level:</strong> {job.salary_level || 'N/A'}</p>
          <p><strong>City:</strong> {job.city || 'N/A'}</p>
          <p><strong>Country:</strong> {job.country || 'N/A'}</p>
          <p><strong>Education Level:</strong> {job.education_level || 'N/A'}</p>
          <p><strong>Language Levels:</strong> 
            {job.language_levels && typeof job.language_levels === 'object'
              ? Object.entries(job.language_levels)
                  .map(([language, level]) => `${language}: ${level}`)
                  .join(', ')
              : 'N/A'}
          </p>
          {a && (
        <button>Apply</button>
      )}
        </div>
      ) : (
        <p>No job details found.</p>
      )}
    </div>
  );
}

export default Details;
