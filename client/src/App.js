import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes} from "react-router-dom";
import Dogs from "./Dogs.js"
import Prueba from './testeando';

const App = () => {
  
  return (
      <div className='App'>
      <BrowserRouter>
      <Routes>
      <Route path='/' component = { Prueba }/>
      <Route path='/Home' component ={ Dogs }/>
      <Route path='/Hola' component = { Prueba }></Route>
      </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App;
