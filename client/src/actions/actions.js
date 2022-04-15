import axios from "axios";

export function getDogs(){
    return function(dispatch){
        return axios.get(`http://localhost:3001/dogs`)
        .then( response => {
            dispatch({type: "GET_DOGS", payload: response.data})
        })
        .catch( error => console.log(error))
    };
};