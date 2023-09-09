import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import { Route, Routes } from 'react-router-dom';
import AddMeeting from './components/AddMeeting';


function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Main />}/>
    <Route path="/addMeeting" element={<AddMeeting />}/>
    </Routes>
    </>
  );
}

export default App;
