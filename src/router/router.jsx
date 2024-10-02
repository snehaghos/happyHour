import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import HappyHour from '../components/HappyHour'
import NumTrip from '../components/NumTrip/NumTrip'
import Framer from '../components/Framer'
import { GuestLayout } from '../layouts/GuestLayout'
import IndexHome from '../GuestInterface/IndexHome'
import AboutUs from '../GuestInterface/components/AboutUs'
import { useAuth } from '../Login/context/AuthProvider'
import Login from '../Login/components/Login'
import Register from '../Login/components/Register'

const GuestRouter = () => {
  return(
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<GuestLayout/>}>
            <Route index element={<IndexHome/>}/>
            <Route path='about' element={<AboutUs/>}/>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register/>} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
};

const AuthRouter = () => {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
          <Route path='happy' element={<HappyHour />} />
          <Route path='array' element={<NumTrip />} />
          <Route path='framer' element={<Framer />} />
         
        
      </Routes>
      </BrowserRouter>
    </>
  );
};

const Router = () =>{
  const {token} =useAuth();
  return token ? <AuthRouter/>  : <GuestRouter/>;
}

export default Router