import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Link } from "react-router-dom";
import { getDogs } from "./actions/actions";

const Dogs = () => {

const dispatch = useDispatch();

useEffect(() => {
    dispatch(getDogs());
//    dispatch(getTemper());
  },);

const currentDogs = useSelector((state) => state.dogs);  

return(
<div>
    <p>Haber ahoraaaaa</p>
{currentDogs?.map( (dog) => (
        <div key={dog.id}>
            <h4>{dog.name}</h4>
            <img src={dog.image} alt="img not found"/>
        </div>
    ))};
</div>
);
};

export default Dogs;