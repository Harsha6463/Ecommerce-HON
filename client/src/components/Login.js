import React, { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ mobileNo: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/login', formData);
      localStorage.setItem('token', data.token);
      toast.success('Login successful!');
      navigate('/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error during login');
    }
  };

  return (
    <div 
      className='App' 
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
        <h1>Login</h1>
        <div>
          <label>mobileNo:</label>
          <input
            type="Number"
            placeholder="Number"
            value={formData.mobileNo}
            onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div>
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;


