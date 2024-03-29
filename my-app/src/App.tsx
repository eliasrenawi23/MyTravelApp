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
import SignUp from './view/Pages/SignUp/SignUp';
import Personal_compass from './view/Pages/Personal_compass/Personal_compass';
import EX_commercial from './view/Pages/EX_commercial/EX_commercial';
import Articale_page from './view/Pages/Articale_page/Articale_page';
import ViewListPage from './view/Pages/ViewListPage/ViewListPage';





function App() {
  return (
    <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/TravelInfo1" element={< TravelInfo1/>} />
        <Route path="/TravelInfo2" element={< TravelInfo2/>} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ViewListPage" element={<ViewListPage />} />
        <Route path="/Preparing" element={<Preparing />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/SummeryPage" element={<SummeryPage />} />
        <Route path="/Personal_compass" element={<Personal_compass />} />
        <Route path="/EX_commercial" element={<EX_commercial />} />
        <Route path="/Articale_page" element={<Articale_page />} />
        

      </Routes>
      <Bottom_Nav />
    </BrowserRouter>
  );
}

export default App;
