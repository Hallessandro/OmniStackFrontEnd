import React from 'react';
import './App.css';
import api from "./services/api";

import logo from './assets/logo.svg';
import Routes from './routes';

function App() {

  return (
    <div className="container">
      <img src={logo} alt="Logo"/>
      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
