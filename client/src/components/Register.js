import React, { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';


const Register = () => {
  const [formData, setFormData] = useState({  mobileNo: '', password: '' });

  const handleSubmit = async (data) => {
    data.preventDefault();
    try {
      await API.post('/signup', formData);
      toast.success('Registration successful!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error during registration');
    }
  };

  return (
    <div className='App'>
    <form onSubmit={handleSubmit}>
      <h1>Register User</h1>
      {/* <Navbar></Navbar> */}
    <div>
      <label>MobileNo :</label>
      <input
        type="Number"
        placeholder="Number"
        value={formData.mobileNo}
        onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
        required
      />
      </div>
      
      <div>
      <label>Password :</label>
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      /></div>
      
      <div>
      <button type="submit">Register</button>
      </div>
    </form>
    </div>
  );
};

export default Register;
