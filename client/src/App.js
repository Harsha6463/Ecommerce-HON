

// import './App.css';

import './components/Product.css'
import Products from './components/Products';
import Register from './components/Register';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';


function App() {
  

  return (
    <div>
      <Router>
      <ToastContainer></ToastContainer>
        <Routes>
          <Route  path="/products" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path='/dashboard' element={<Dashboard></Dashboard>}>Dash Board</Route>
        </Routes>
      </Router>
      
   
    <div className="App">
 
     
   

    
      
    </div>
    </div>
  );
}

export default App;
