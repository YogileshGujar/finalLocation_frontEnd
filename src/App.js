
import {BrowserRouter as Router ,Routes ,Route  } from 'react-router-dom';
import './App.css';
import Headers from './components/Headers';
import Login from './components/Login';
import Otp from './components/Otp';
import Register from './components/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetLocation from './components/GetLocation';
import MidPoint from './components/MidPoint';
import Home from './components/Home';


function App() {
  return (
   
   <>
   <Headers></Headers>
   <Router>
    <Routes>
     
      <Route exact path='/' element={<Login/>}></Route>
      <Route exact path='/otp' element={<Otp/>}></Route>
      <Route exact path='/register' element={<Register/>}></Route>
      <Route exact path='/getLocation' element={<GetLocation/>}></Route>
      <Route exact path='/midpoint' element={<MidPoint/>}></Route>
      <Route exact path='/home' element={<Home/>}></Route>

    </Routes>
   </Router>
   </>
   
  );
}

export default App;
