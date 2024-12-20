import React, { useState, useEffect } from 'react';
import '@/App.css';
import AppliedJobTable from './AppliedJobTable';
import Jobs from './Jobs';



const JobApplicationForm = ({ job, onSubmit, onClose, applicationData }) => {
  const [name, setName] = useState(applicationData ? applicationData.name : '');
  const [email, setEmail] = useState(applicationData ? applicationData.email : '');
  const [coverLetter, setCoverLetter] = useState(applicationData ? applicationData.coverLetter : null);
  const [jobTitle, setJobTitle] = useState(applicationData ? applicationData.jobTitle : Jobs.title);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      coverLetter,
      jobTitle,
    };

   
    onSubmit(formData, applicationData ? applicationData.id : null); 
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h2>{applicationData ? `Update Application for ${jobTitle}` : `Apply for ${jobTitle}`}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="coverLetter">Cover Letter (Upload File)</label>
            <input
              id="coverLetter"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCoverLetter(e.target.files[0])}
            />
          </div>

          <button type="submit">{applicationData ? 'Update Application' : 'Submit Application'}</button>
        </form>

        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default JobApplicationForm;







 



