import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const Login = () => {
  const [input, setInput] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const errors = {};
    if (!input.username.trim()) errors.username = 'Username is required.';
    if (!input.password.trim()) errors.password = 'Password is required.';
    return errors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', {
        username: input.username,
        password: input.password
      });

      // Handle successful login, e.g., store the token
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Login failed! ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>
          <div className='my-2'>
            <Label>Username</Label>
            <Input
              type='text'
              value={input.username}
              name='username'
              onChange={changeEventHandler}
              placeholder='Enter your username'
            />
            {errors.username && <p className='text-red-500 text-sm'>{errors.username}</p>}
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type='password'
              value={input.password}
              name='password'
              onChange={changeEventHandler}
              placeholder='Enter your password'
            />
            {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
          </div>
          <Button type='submit' className='w-full my-4'>
            Login
          </Button>
          <span className='text-sm'>
            Don't have an account? <Link to='/signup' className='text-blue-600'>Sign Up</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
