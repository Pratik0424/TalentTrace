import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validatePasswords = () => {
    const errors = {};
    if (!password.trim() || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      errors.password = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    return errors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validationErrors = validatePasswords();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    // Mock reset process
    const resetEmail = localStorage.getItem('resetEmail');
    if (!resetEmail) {
      toast.error('Password reset session expired.');
      navigate('/login');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((user) =>
      user.email === resetEmail ? { ...user, password } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem('resetEmail'); // Clear reset email
    toast.success('Password has been reset successfully!');
    navigate('/login'); // Redirect to login
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Reset Password</h1>
          <div className='my-2'>
            <Label>New Password</Label>
            <Input
              type='password'
              value={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter a new password'
            />
            {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
          </div>
          <div className='my-2'>
            <Label>Confirm New Password</Label>
            <Input
              type='password'
              value={confirmPassword}
              name='confirmPassword'
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm your new password'
            />
            {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>}
          </div>
          <Button type='submit' className='w-full my-4'>
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
