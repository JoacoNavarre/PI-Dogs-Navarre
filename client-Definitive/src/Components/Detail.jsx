import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetail } from "../Actions/index";
import NavBar from "./NavBar";
import "./Detail.css";


const Detail = (props) => {
  const dispatch = useDispatch();
  const {id} = useParams();
  console.log(id, "esto deberia ser el dog"); 

  useEffect(() => {
    //const id = props.match.params.id;
    dispatch(getDogDetail(id));
  }, []);

  
  const stateDetail = useSelector((state) => state.dogsDetail);

  return (
    <div>
      < NavBar/>
      <div className="container">
        {stateDetail &&
          stateDetail.map((x) => (
            <div className="detailCtn" key={x.id}>
              <div className="detailName">
                <h3>{x.name} </h3>
              </div>
              <div className="detailTemp">
                <span>Temperamento: {x.temperament}</span>
              </div>
              <div className="caracteristicas">
                <span>Altura: {x.height}</span>
              </div>
              <div className="caracteristicas">
                <span>Peso: {x.weight}</span>
              </div>
              <div className="caracteristicas">
                <span>Años de vida: {x.life_span}</span>
              </div>
              <div className="imgDetailCtn">
                <img src={x.image} className="img" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Detail;