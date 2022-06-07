import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearFilter, getDogsbyBreed } from "../Actions";
import "./NavBar.css"

export default function NavBar( {setCurrent, current} ){

 const[name, setName] = useState();

 const handleOnChange = (e) => {
  setName(e.target.value)
 };

 const dispatch = useDispatch();

 const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(getDogsbyBreed(name));
  setCurrent(current+1);
 };

 const HandleHome = () => {
  dispatch(clearFilter());
//setCurrent(current+1)
 };

return(
<div id="navlist">
      <Link to="/">
        <span className="btn">Inicio</span>
      </Link>

      <Link to="/Home">
        <span className="btn" onClick={HandleHome}>Home</span>
      </Link>

      <Link to="/CreateDog">
        <span className="btn">Create Dog</span>
      </Link>
      
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search Dogs"
            value={name}
            onChange={handleOnChange}
          />
          <button onClick={handleSubmit}>Search</button>
          </form>
          </div>

</div>
);
};
