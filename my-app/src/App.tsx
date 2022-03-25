import React from 'react';
import './App.css';
import ViewList from './view/components/ViewList/ViewList';
import Navbar from './view/components/nav/Navbar'
import Bottom_Nav from './view/components/nav/Bottom_Nav';
//import { Link, Switch, Route } from 'react-router';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './view/Pages/Login/Login';
import Homepage from './view/Pages/Homepage/Homepage';
import TravelInfo1 from './view/Pages/TravelInfo1/TravelInfo1';
import TravelInfo2 from './view/Pages/TravelInfo2/TravelInfo2';
import Test from './view/Pages/TravelInfo1/Test';
import Preparing from './view/components/Preparing/Preparing';
import SummeryPage from './view/Pages/SummeryPage/SummeryPage';
import SummeryComp from './view/components/SummeryComp/SummeryComp';
import SignUp from './view/Pages/SignUp/SignUp';





function App() {
  return (
    <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/TravelInfo1" element={< TravelInfo1/>} />
        <Route path="/TravelInfo2" element={< TravelInfo2/>} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ViewList" element={<ViewList />} />
        <Route path="/Preparing" element={<Preparing />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/SummeryPage" element={<SummeryPage />} />
        <Route path="/SummeryComp" element={<SummeryComp />} />
        

      </Routes>
      <Bottom_Nav />
    </BrowserRouter>
  );
}

export default App;
