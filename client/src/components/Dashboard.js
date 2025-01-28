import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const Logout = () => {
    navigate('/');
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
    }}>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={Logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
