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

export function getTemperaments(){
    return function(dispatch){
        return axios.get(`http://localhost:3001/Temperaments`)
        .then( response => {
            dispatch({type: "GET_TEMPERAMENTS", payload: response.data})
        })
        .catch( error => console.log(error))
    };
};

export function getDogsbyBreed(name) {
    return function(dispatch){
        return axios.get(`http://localhost:3001/dogs?name=${name}`)
        .then(res => {
            dispatch({type: 'GET_DOGS_BY_BREED', payload: res.data})
        })
        .catch( error => console.log(error))     
    };
};

export function getDogDetail(id){
    return function(dispatch){
        return axios.get(`http://localhost:3001/dogs/${id}`)
         .then(res => {
             dispatch({type: 'GET_DOG_DETAIL', payload: res.data})
         })
     }
 }

export function filterTemper(dogs, value){
    let array = dogs.filter( dog => dog.temperament?.includes(value))
    return {
         type:'TEMPER_FILTER',
         payload: array
     };
  };

  export function orderAZ(dogs){
    const az = dogs.sort((a,b) => a.name > b.name?1:-1)
    return {
         type:'ORDER_AZ',
         payload: az
     };
  };
 
  export function orderZA(dogs){
     const za = dogs.sort((a,b) => a.name < b.name?1:-1)
     return {
          type:'ORDER_ZA',
          payload: za
      };
   };

   export function weightOrder(dogs, order){
    console.log(order)
    switch(order){
        case "Heaviest":
        const orderHeaviest = dogs.sort((a,b) => a.minWeight > b.minWeight?1:-1)
        return{
            type: "ORDER_HEAVIEST",
            payload: orderHeaviest
        };
        case "Lightest":
        const orderLightest = dogs.sort((a,b) => a.maxWeight < b.maxWeight?1:-1)
        return{
            type: "ORDER_LIGHTEST",
            payload: orderLightest
        };
        default: return null;
    }
   };

   export function filterOrigin(dogs, order){
    console.log(order)
    switch(order){
        case "API":
        const apiDogs = dogs.filter( (dog) => (!dog.createdInDB) )
        return{
            type: "ORIGIN_DOGS",
            payload: apiDogs
        };
        case "DB":
        const dbDogs = dogs.filter( (dog) => (dog.createdInDB == true) )
        return{
            type: "ORIGIN_DOGS",
            payload: dbDogs
        };
        default: return null;
    }
   };

   export function clearFilter(){
       return{
           type:"CLEAN_FILTER",
           payload: null
       }
   }