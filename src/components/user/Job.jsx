import React from 'react';
/*import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';*/

import { Button } from '../ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { useNavigate } from'react-router-dom';
import Jobs from './Jobs';



const Job = ({ job}) => {
  const navigate = useNavigate();

  const goToJobDescription = () => {
    navigate('/job-description', { state: { singleJob: job } });
  };

  const daysAgoFunction = (mysqlTime) => {
    const createdAt = new Date(mysqlTime); 
    const currentTime = new Date(); 
    const timeDifference = currentTime - createdAt; 
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
};

  return (
   
   <div className="p-5 rounded-nd shadow-xl bg-white border border-gray-100">
    <div className="flex items-center justify-between">
    <p className='text-sm text-gray-500'>{job?.createdAt ? (daysAgoFunction(job.createdAt) === 0 ? "Today" : `${daysAgoFunction(job.createdAt)} days ago`) : 'Unknown'}</p>
      <Button variant="outline" className="rounded-full" size="icon">
        <Bookmark />
      </Button>
    </div>

    <div className="flex items-center gap-2 my-2">
      <Button className="p-6" variant="outline" size="icon">
        <Avatar>
          <AvatarImage src="https://www.shutterstock.com/shutterstock/photos/2346756545/display_1500/stock-vector-letter-c-abstract-logo-design-with-family-combination-in-colorful-design-2346756545.jpg" />
        </Avatar>
      </Button>
      <div>
        <h1 className="font-medium text-lg">{Jobs.companyName}</h1>
        <p className="text-sm text-gray-500">{Jobs.title}</p>
      </div>
    </div>

    <div>
      <h1 className="font-bold text-lg my-2">{Jobs.title}</h1>
      <p className="text-sm text-gray-600">{Jobs.description}</p>
    </div>

    <div className="flex items-center gap-2 mt-4">
      <Badge className="text-blue-700 font-bold" variant="ghost">
        {Jobs.positions} Positions
      </Badge>
      <Badge className="text-[#F83002] font-bold" variant="ghost">
        {Jobs.jobType}
      </Badge>
      <Badge className="text-[#7209b7] font-bold" variant="ghost">
        {Jobs.salary}
      </Badge>
    </div>

    <div className="flex items-center gap-4 mt-4">
      <Button variant="outline" onClick={goToJobDescription}>Details</Button>
      <Button className="bg-[#7209b7]">Save For Later</Button>
    </div>
  </div> 
    


  );
};

export default Job;