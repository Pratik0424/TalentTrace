import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import CompanyCreate from './components/admin/CompanyCreate'
import Applicants from './components/admin/Applicants'
import Companies from './components/admin/Companies'
import CompanySetup from './components/admin/CompanySetup'
import RecruiterCompany from './components/RecruiterCompany'
import AppliedJobTable from './components/user/AppliedJobTable'
import UserHome from './components/user/UserHome'
import Job from './components/user/Job'
import Jobs from './components/user/Jobs'
import JobApplicationForm from './components/user/JobApplicationForm'
import JobDescription from './components/user/JobDescription'




//user routes


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path:"/forgot-password" ,
    element:<ForgotPassword /> 
 },
 {
    path:"/reset-password" ,
    element:<ResetPassword />
 },

//admin routes
//Admin ke liye yaha se start hoga

{
  path: '/jobs',
  element: <AdminJobs /> //AdminJobs
},
{
  path: '/postjobs',
  element: <PostJob /> //post new job
},

{
  path: '/createcompanies',
  element: <CompanyCreate /> // company create
},
{
  path: '/companies',
  element: <Companies /> // list of your recent register company + create company
},
{
  path: '/set-companies',
  element: <CompanySetup /> // edit companies 
},
{
  path: '/setCompanies/:id',
  element: <CompanySetup /> // edit companies 
},

{
    path: '/applicants',
    element: <Applicants /> // list of applicants
  },
  {
    path: '/jobs',
    element: <AdminJobs /> // list of jobs + create jobs
  },
  {
    path: '/recPage',
    element: < RecruiterCompany /> // post new job
  },
  {
    path: '/userHome',
    element: <UserHome /> // User Dashboard
  
  },
  {
    path: '/user/Job',
    element: <Job /> // User Job List
  },
  {
    path: '/user/Jobs',
    element: <Jobs /> // User Job List
  },
  {
    path: '/user/JobTable',
    element: <AppliedJobTable /> // User Job Table
  },

  {
    path: '/user/AppForm',
    element: <JobApplicationForm /> // User Job application Form
  },

  {
    path: '/user/JobDesc',
    element: <JobDescription /> // User Job description
  },

  

  
  

])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
