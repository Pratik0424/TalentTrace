import React, {useState , useEffect} from 'react';
/*import { useDispatch } from 'react-redux';
import { setNewApplication } from '../redux/jobSlice';  
import JobApplicationForm from './JobApplicationForm';
import { useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';  */

import { useDispatch } from'react-redux';
import { setNewApplication } from '@/redux/jobSlice';
import JobApplicationForm from './JobApplicationForm';
import { useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'react-toastify';
import { useParams , useNavigate } from 'react-router-dom';


const JobDescription = () => {
    const { jobId } = useParams();  
  const [job, setJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
        try {
            const response = await fetch(`/api/jobs/${jobId}`);
            if (!response.ok) throw new Error('Job not found');
            
            const data = await response.json();
            setJob(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch job details');
            toast.error(err.message || 'Failed to fetch job details');  // Directly use err.message here
            navigate('/jobs');  // Navigate to /jobs on error
        } finally {
            setLoading(false);
        }
    };
    
    if (jobId) {
        fetchJobDetails();
    }
}, [jobId, navigate]);

    const handleApplyNow = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleFormSubmit = (formData) => {
       
        const application = { ...formData, jobTitle: job.title, jobId: job.id, id: Date.now() };
        dispatch(setNewApplication(application)); 
        setShowForm(false); 
        toast.success("Application submitted successfully!");
    };

    if (loading) return <div>Loading job details...</div>;

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-7xl mx-auto my-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-xl">{job.title} - Job Description</h1>
                    <div className="flex items-center gap-2 mt-4">
                        <Badge className="text-blue-700 font-bold" variant="ghost">
                            {job.positions} Positions
                        </Badge>
                        <Badge className="text-[#F83002] font-bold" variant="ghost">
                            {job.jobType}
                        </Badge>
                        <Badge className="text-[#7209b7] font-bold" variant="ghost">
                            {job.salary}
                        </Badge>
                    </div>
                </div>
                <Button className="bg-[#7209b7]" onClick={handleApplyNow}>Apply Now</Button>
            </div>

            <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
            <div className="my-4">
                <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{job.title}</span></h1>
                <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{job.companyName}</span></h1>
                <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{job.description}</span></h1>
                <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{job.experience || '0-3 yrs'}</span></h1>
                <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{job.salary}</span></h1>
                <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">{job.applicantCount}</span></h1>
                <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{new Date(job.postedDate).toLocaleDateString()}</span></h1>
            </div>

            {showForm && (
                <JobApplicationForm
                    job={job}
                    onSubmit={handleFormSubmit}
                    onClose={handleCloseForm}
                />
            )}
        </div>
    );
};

export default JobDescription;









