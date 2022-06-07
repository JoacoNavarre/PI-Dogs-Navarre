import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterTemper, getDogs, getTemperaments, orderZA, orderAZ, weightOrder, filterOrigin, clearFilter} from "../Actions/index.js";
import Paginado from "./Pagination.jsx";
import "./Home.css";
import NavBar from "./NavBar";

const Home = () => {

const dispatch = useDispatch();
const [current, setCurrent] = useState(1);
const [dogsPerPage, setDogsPerPage] = useState(8);
// const [ orderDogsZA, setOrderDogsZA ] = useState();
// const [ orderAZ, setOrderAZ ] = useState();
//const [changes, setChanges] = useState(false);

useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  },[]);

const reduxDogs = useSelector((state) => state.dogs);  
const reduxTemperaments = useSelector((state) => state.temperaments);
const filtredDogs = useSelector((state) => state.filtredDogs);
//const dogsByBreed = useSelector((state) => state.dogsByBreed)
//const OrderedDogs = useSelector((state) => state.OrderedDogs)
//console.log(OrderedDogs)


const indexOfLastDog = current * dogsPerPage;
const indexOfFirstDog = indexOfLastDog - dogsPerPage;
const currentDogs = filtredDogs!==null?filtredDogs.slice(indexOfFirstDog, indexOfLastDog):reduxDogs.slice(indexOfFirstDog, indexOfLastDog);
//let number = filtredDogs.le currentDogs.length
//let currentDogs = OrderedDogs.length>0?OrderedDogs.slice(indexOfFirstDog, indexOfLastDog):semiCurrentDogs;

//console.log(reduxDogs, "estooooOOO");


const paginado = (pageNumber) =>{
    setCurrent(pageNumber)
};
const nextPage = () => (current + 1)
const prevPage = () => (current - 1)<indexOfFirstDog?setCurrent(current - 1):null

const HandleOnChangeTemperaments = (e) => {
    if(e.target.value == "ALL_DOGS"){
        dispatch(clearFilter());
        dispatch(getDogs())
        setCurrent(1);
    }else dispatch(filterTemper(reduxDogs, e.target.value));
};

const HandleOnChangeOrigin = (e) => {
    if(e.target.value == "Api dogs"){
    dispatch(filterOrigin(reduxDogs, "API"))
    }else{
     dispatch(filterOrigin(reduxDogs, "DB"))
    }
    setCurrent(current+1);
}; 

const HandleOnChangeAlphabet = (e) => {
if(e.target.value == "Z-A"){
    if(filtredDogs!==null){
        dispatch(orderZA(filtredDogs))
    }else{
         dispatch(orderZA(reduxDogs))
        };
}else if(e.target.value == "A-Z"){
    if(filtredDogs!==null){
        dispatch(orderAZ(filtredDogs))
    }else{
         dispatch(orderAZ(reduxDogs))
        };
    };
    setCurrent(current+1);
 };



const HandleOnChangeWeight = (e) => {
if(filtredDogs!==null){
    dispatch(weightOrder(filtredDogs, e.target.value))
}else{
    dispatch(weightOrder(reduxDogs, e.target.value))
}
setCurrent(current+1);
};

return(
<div>
    <div>
        <NavBar setCurrent={setCurrent} current={current}/>
    </div>

    <div>
        <span>Filtrar por temperamento:</span>
        <select placeholder="All Dogs" onChange={ (e)=> HandleOnChangeTemperaments(e)}>
            <option value={"ALL_DOGS"}>All Dogs</option>
            {reduxTemperaments.map((t) => (
                <option key={t.id}>{t.name}</option>
            ))};
        </select>
    </div>

    <div>
        <span>Filtrar por origen</span>
        <select placeholder="Origen" onChange={(e)=> HandleOnChangeOrigin(e)}>
                <option name="Api dogs" value="Api dogs">Api Dogs</option>
                <option name="DB Dogs" value="DB Dogs">Database Dogs</option>
        </select>
    </div>

    <div className="ordenamiento">
        <div className="spanOrder">
          <span>Ordenamiento Alfabeticamente: </span>
        </div>
        <div className="selectOrder">
          <select placeholder= " " onChange={ (e) => HandleOnChangeAlphabet(e)}>
            <option value="A-Z" name="A-Z">
              A-Z
            </option>
            <option value="Z-A" name="Z-A">
              Z-A
            </option>
          </select>
        </div>
      </div>

      <div className="ordenamiento">
        <div className="spanOrder">
          <span>Ordenamiento por Peso: </span>
        </div>
        <div className="selectOrder">
          <select placeholder= "Weight Order" onChange={ (e) => HandleOnChangeWeight(e)}>
            <option value="Heaviest" name="Heaviest">
              Lightest
            </option>
            <option value="Lightest" name="Lightest">
              Heaviest
            </option>
          </select>
        </div>
      </div>

    <div className="container">
{currentDogs !== "Error"?currentDogs.map( (dog) => (
        <div key={dog.id} className="dogsContainer">
            <div className="dogName">
             <Link to={`/dogs/${dog.id}`} >
                <h4>{dog.name} </h4>
             </Link>
             </div>
             <div className="imgCtn">
                <img src={dog.image} className="img" alt="img not found"/>
            </div>
            <div>
               <p>{dog.temperament}</p> 
            </div>
            <div>
               <p>Weight: {dog.weight}</p> 
            </div>
        </div>
    )):<div className="NonCoincidence">No se han encontrado coincidencias :(</div>}
    </div>

    <div>
        <Paginado paginado={paginado} prevPage={prevPage} nextPage={nextPage} reduxDogs={filtredDogs!==null?filtredDogs.length:reduxDogs.length} dogsPerPage={dogsPerPage}/>
    </div>

</div>
);
};

export default Home;