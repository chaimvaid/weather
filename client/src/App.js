import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/routers/AppRouter';
import Notifications from './components/ui/Notifications/Notifications';
import Confirm from './components/ui/Confirm/Confirm';

function App() {
  
  

  return (
    <div className="App">
      
      <BrowserRouter>
        <AppRouter/>
      <Notifications />
      <Confirm />
    </BrowserRouter>
    
      
    </div>
  );
}

export default App;

