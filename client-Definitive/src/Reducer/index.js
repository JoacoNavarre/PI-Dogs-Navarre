const initialState = {
    dogs: [],
    temperaments: [],
    dogsByBreed: [],
    dogsDetail: [],
    filtredDogs: [],
};

function rootReducer(state = initialState, action){
    switch(action.type){
        case "GET_DOGS":
            return{
                ...state,
                dogs: action.payload
            };
        case 'ORDER_AZ':
            return{
                ...state,
                dogs: action.payload
            };
        case 'ORDER_ZA':
            return{
                ...state,
                dogs: action.payload
            };
        case 'GET_DOGS_BY_BREED':
            return {
                ...state,
                filtredDogs: action.payload
            };    
        case "GET_TEMPERAMENTS":
            return{
                 ...state,
                temperaments: action.payload   
            };
        case "GET_DOG_DETAIL":
            return{
                ...state,
                dogsDetail: action.payload
            };
        case "TEMPER_FILTER":
            return{
                ...state,
                filtredDogs: action.payload
            };
        case "ORIGIN_DOGS":
            return{
                ...state,
                filtredDogs: action.payload
           };
        case "ORDER_LIGHTEST":
            return{
                ...state,
                dogs: action.payload
            };
        case "ORDER_HEAVIEST":
            return{               
                ...state,
                dogs: action.payload
            }; 
        case "CLEAN_FILTER":
            return{
                ...state,
                filtredDogs: action.payload
            }
    default: return state;
    };
};

export default rootReducer;