import './App.css';
import {BrowserRouter, Route, Routes, Switch} from "react-router-dom";
import Home from "./Components/Home.jsx";
import CreateDog from './Components/CreateDog';
import Detail from "./Components/Detail";
import NavBar from "./Components/NavBar";
import LandingPage from './Components/Landing';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Route exact path='/Home' component = {Home}/>
        <Route path = "/H" component= { NavBar}/>
        <Route exact path = "/" component = { LandingPage}/>
        <Route exact path = '/CreateDog' component = { CreateDog }/>
        <Route path = '/dogs/:id' component = {Detail}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
