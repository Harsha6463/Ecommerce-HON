import React, { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
  const [formData, setFormData] = useState({ mobileNo: '', password: '' });
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.mobileNo || !formData.password) {
      toast.error('Please fill in both mobile number and password!');
      return;
    }

    try {
      
      const response = await API.post('/signup', formData);
      console.log(response)
      toast.success('Registration successful!');
  
      navigate('/');
    } catch (err) {
     
      toast.error(err.response?.data?.message || 'Error during registration');
    }
  };

  return (
    <div className='App'
   
      style={{ 
        backgroundImage: 'url(/assets/background.jpg)',
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        minHeight: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    
    >
      <form onSubmit={handleSubmit}>
        <h1>Register User</h1>
        <div>
          <label>Mobile No :</label>
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
          />
        </div>

        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;

