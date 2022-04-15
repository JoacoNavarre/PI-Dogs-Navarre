const axios = require(`axios`);
//const api_key = require("../.env");
const {Dog, Temperament} = require("../db");

async function getApiDogs (){
 
const response = await axios.get(`https://api.thedogapi.com/v1/breeds?`);
const result = response.data;

let dogs = []
 for (var i = 0; i < result.length; i++){
     const newDog = {
         id: result[i].id,
         name: result[i].name,
         weight: result[i].weight.metric,
         height: result[i].height.metric,
         life_span: result[i].life_span,
         image: result[i].image.url,
         breedGroup: result[i].breed_group,
         temperament: result[i].temperament
        }
        dogs.push(newDog);   
 };
 console.log("salieron bien los dogs");
 return dogs; 
};



const getDogs = async function (req, res){
  
  const dogs = await getApiDogs();
  let queryName = req.query.name;

  if(queryName){
  let selectedDogs = []
  dogs.map( dog => {
    if(dog.name?.toLowerCase().includes(queryName.toLowerCase()))selectedDogs.push(dog);
  });
  //console.log(selectedDogs[1].breedGroup)
  selectedDogs.length > 0 ? res.send(selectedDogs) : res.send("No se han encontrado razas correspondientes")
} 

else{
  res.status(200).send(dogs)
  return dogs
};
};



async function GetDogById (req,res){
    
const dogs = await getApiDogs();
const Id = req.params.id;
console.log(Id)
const SelectedDog = dogs.filter( dg => dg.id == Id);
SelectedDog.length ? res.send(SelectedDog) : res.status(404).send("No se ha encontrado esa raza de perro")  
 };


 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function createDog (req, res){

};




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function createTemperaments(){

    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=0ad5140c-a3e7-42a8-8c6d-44e93f5fcd7ars`)
    const result = response.data
    let array = []
    let newA = []
    let newObj = {}
  
      for(var i = 0; i < result.length; i++){
        var a = result[i].temperament?result[i].temperament.split(', '): null    
          array = array.concat(a)      
          }    
             
        for(var j = 0; j < array.length; j++){       
            await Temperament.findOrCreate({
            where: {
               name: array[j]
            }
          }) 
        };     
        // array.forEach(el => {
        //   if(!(el in newObj)){
        //     newObj[el] = true
        //     newA.push(el)
        //   }
        // })    
        // // res.json(saveTemps)
        // res.send(newA)
      console.log(Temperament)  
      };

      createTemperaments();

    async function getTemperaments (req, res) {
      createTemperaments();
      const tempers = await Temperament.findAll({
        includes:{
          attributes: ["name"]
        }
      });
    console.log(tempers)
    tempers?res.status(200).send(tempers):res.status(404).send("no hay temperamentos disponibles")
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
  

module.exports = {getDogs, getTemperaments, GetDogById, createDog};