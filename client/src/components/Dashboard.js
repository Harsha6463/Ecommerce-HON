import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const Logout = () => {
    navigate('/products');
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={Logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
