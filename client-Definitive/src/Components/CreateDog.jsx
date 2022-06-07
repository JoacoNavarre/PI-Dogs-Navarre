import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../Actions/index";
import "./Create.css";
import axios from "axios";
import NavBar from "./NavBar";

const CreateDog = () => {

const dispatch = useDispatch();    
useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getDogs());
}, []);    

getTemperaments();
const temperRedux = useSelector((state) => state.temperaments);
const dogsRedux = useSelector((state) => state.dogs);
const BreedGroups = [];

function BreedGetter(dogsRedux){
dogsRedux?.map( dog => {if(!BreedGroups.includes(dog.breedGroup)) BreedGroups.push(dog.breedGroup)});
console.log(BreedGroups)
};
BreedGetter(dogsRedux);

console.log("aber si esto sieve")

let [error, setError] = useState({});
const [input, setInput] = useState({
    name: '',
    height: '',
    minHeight: '',
    maxHeight: '',
    weight: '',
    minWeight: '',
    maxWeight: '',
    life_span: '',
    breedGroup: ''
  });
const[temperaments, setTemperaments]=useState([])
//Terminar funcion de validar  
function validate(value){ 
let error = {};

if(!/^\d+$/.test(input.minHeight || input.maxHeight || input.minWeight || input.maxWeight)){
  error.NaN = "solo pueden ingresarse numeros"
}
else if((input.minHeight > input.maxHeight) || (input.minWeight > input.maxWeight)){
  error.minMax = "Los valores Min no pueden ser mayores que los Max"
} 
else if( !input.name || !input.minHeight || !input.maxHeight || !input.minWeight || !input.maxWeight || !input.life_span || temperaments.length<1 || !input.breedGroup ){
  error.incomplete = "Hay campos incompletos";
}
else if(!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(input.name)){
  error.name = "El name contiene caracteres incorrectos"
}
 else if((input.minWeight || input.minHeight || !input.maxHeight || !input.maxWeight || !input.life_span)<0){
   error.negative = "No pueden ingresarse numeros negativos";
 }
return error
};

const HandleOnChange = (e) => {
    
    setInput(PreValue => ({
        ...PreValue,
        [e.target.name]: e.target.value 
      }));
    
    setError(validate({
      ...input,
       [e.target.name]: e.target.value
    })); 
};
console.log(error);

const HandleTemper = (e) => {
if (temperaments.length<1 || !temperaments[e.target.value])
setTemperaments(PreValue => ([ 
    ...PreValue,
    e.target.value
]))
};
console.log(temperaments);

const HandleBreedGroup = (e) => {
    setInput(PreValue => ({
        ...PreValue,
        [e.target.name] : e.target.value
    }));
};

const HandleOnSubmit = (e) => {
e.preventDefault();
const form = document.getElementById("CreateForm");
if(input.name.length>0){
alert("El perro fue creado con exito");
//let temperament = [];
//temperament.push(input.temperament, input.temperament1, input.temperament2)
    axios({
      method: "post",
      url: "http://localhost:3001/dog",
      data: {
        name: input.name,
        height: input.minHeight + "-" + input.maxHeight,
        minHeight: input.minHeight,
        maxHeight: input.maxHeight,
        weight: input.minWeight + "-" + input.maxWeight,
        minWeight: input.minWeight,
        maxWeight: input.maxWeight,
        life_span: input.life_span,
        temperament: temperaments,
        breedGroup: input.breedGroup,
      },
    })
    dispatch(getDogs());
    form.reset();
    setInput({
      name: '',
    height: '',
    minHeight: '',
    maxHeight: '',
    weight: '',
    minWeight: '',
    maxWeight: '',
    life_span: '',
    breedGroup: ''
    })
  }else{
    alert("El formulario tiene errores")
  }
};

const UnselectTempers = (e) => {
const NewTemp = temperaments.filter( t => t!==e.target.value)
setTemperaments(NewTemp)
}


return (
    <div className>
      <div>
        <NavBar/>
      </div>

      <form name="CreateForm" id="CreateForm">

      <label>Temperamento: </label>
          <div>
            <select name= "temperament" onChange={HandleTemper}>
                {temperRedux?.map( temper => <option key={temper.id} value={temper.name}>
                    {temper.name}
                    </option>
                    )};
            </select>
            <div>
            {/* <select name= "UnselectTempers" onChange={UnselectTempers}>
                {temperaments?.map( (temper) => <option key={temper} value={temper}>
                    {temper}
                    </option>
                    )};</select> */}
                    </div>
        </div>

        <div>
          <label>Raza: </label>
          <div>
          <select name= "breedGroup" onChange={HandleBreedGroup}>
                {BreedGroups?.map( breed => <option key={BreedGroups.indexOf(breed)} value={breed}>
                    {breed}
                    </option>
                    )};
            </select>
          </div>
        </div>

        <div>
          <label>Nombre: </label>
          <div>
            <input type="text" name= "name"  onChange={HandleOnChange} />
          </div>
        </div>

        <div>
          <div>
          <label>Altura máxima: </label>
          </div>
          <div>
            <input name="maxHeight" min="1"  onChange={HandleOnChange} />
          </div>
        </div>

        <label>Altura mínima: </label>
          <div>
            <input name="minHeight" min="1"  onChange={HandleOnChange} />
          </div>
        <div>

        <div>
          <label>Peso Máximo: </label>
        </div>
        <div>
            <input name="maxWeight" min="1"  onChange={HandleOnChange} />
        </div>

        <label>Peso mínimo: </label>
        <div>
            <input name="minWeight" min="1"  onChange={HandleOnChange} />
        </div>
        </div>

        <div>
          <label>Años de vida: </label>
          <div>
            <input type="number" name= "life_span" min="1"  onChange={HandleOnChange} />
          </div>
          </div>

        <div>
        {!error.minMax ? null : <p>{error.minMax}</p>}
        {!error.NaN ? null : <p>{error.NaN}</p>}
        {!error.name ? null : <p>{error.name}</p>}
        {!error.incomplete ? null : <p>{error.incomplete}</p>}
        </div>

        { !error.minMax && !error.incomplete && !error.name && !error.NaN && !error.negative?
        <div className="btnCreate">
          <button onClick={(e) => HandleOnSubmit(e)}>Create</button>
        </div>:null}
      </form>
    </div>
  );


};

export default CreateDog