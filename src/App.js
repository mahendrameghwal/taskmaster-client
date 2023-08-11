import {BrowserRouter,Routes,Route} from "react-router-dom"

import './App.css';
import React from 'react';
import NavbarWithDropdown from './Navbar';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from "./pages/Home";
import Aboutus from "./components/About";
import Contacts from "./components/Contacts";



function App() {

  return (
    <div className=" bg-stone-200 min-h-screen max-h-full ">
    <BrowserRouter>
    <NavbarWithDropdown/>
    <Routes>
    <Route path="/" index element={  <Home/>}/>
    <Route path="/signin" element={ <Signin/>}/>
    <Route path="/signup" element={  <Signup/>}/>
    <Route path="/about" element={  <Aboutus/>}/>
    <Route path="/contact" element={ <Contacts/>}/>
    </Routes>
   
   
   
    </BrowserRouter>
    
    </div>
  );
}

export default App;
