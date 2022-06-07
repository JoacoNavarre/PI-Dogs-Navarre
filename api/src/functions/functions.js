const axios = require(`axios`);
const { v4: uuidv4 } = require('uuid');
//const api_key = require("../.env");
const {Dog, Temperament} = require("../db");

async function getApiDogs (){

const response = await axios.get(`https://api.thedogapi.com/v1/breeds?`);
const result = response.data;



let dogs = []
 for (var i = 0; i < result.length; i++){

  let weight = result[i].weight.metric

  if(typeof weight == "string"){
    const splited = weight.split("- ")
    var minWeight = parseInt(splited[0])
    var maxWeight = parseInt(splited[1])
  }else{
    minWeight = "No data"
    maxWeight = "Sorry :("
  };

  let height = result[i].height.metric

  if(typeof height == "string"){
    const splitedH = height.split("- ")
    var minHeight = parseInt(splitedH[0])
    var maxHeight = parseInt(splitedH[1])  
  }else{
    minHeight = "No data"
    maxHeight = "Sorry :("
  };


  const newDog = {
         id: result[i].id,
         name: result[i].name,
         weight: result[i].weight.metric,
         minWeight: minWeight,
         maxWeight: maxWeight,
         height: result[i].height.metric,
         minHeight: minHeight,
         maxHeight: maxHeight,
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

const getDbDogs = async function (req, res){
  const dogs = await Dog.findAll();
  return dogs
}


const getDogs = async function (req, res){

  const apiDogs = await getApiDogs();
  const dbDogs = await getDbDogs();
  const dogs = apiDogs.concat(dbDogs);
  let queryName = req.query.name;

  console.log(queryName)

  if(queryName){
  let selectedDogs = []
  dogs.map( dog => {
    if(dog.name?.toLowerCase().includes(queryName.toLowerCase()))selectedDogs.push(dog);
  });
  //console.log(selectedDogs[1].breedGroup)
  selectedDogs.length > 0 ? res.send(selectedDogs) : res.send("Error")
}

else{
  res.status(200).send(dogs)
  return dogs
};
};



async function GetDogById (req,res){

const apiDogs = await getApiDogs();
const dbDogs = await getDbDogs();
const dogs = apiDogs.concat(dbDogs);
const Id = req.params.id;
console.log(Id)
const SelectedDog = dogs.filter( dg => dg.id == Id);
SelectedDog.length ? res.send(SelectedDog) : res.status(404).send("No se ha encontrado esa raza de perro")
 };


 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function createDog (req, res){
    
    try{
    const { name, height, minHeight, maxHeight, weight, maxWeight, minWeight, life_span, temperament, breedGroup } = req.body
    console.log(temperament, "ESTO ES EL POST")
     const newDog = await Dog.create({
         id: uuidv4(),
         name: name,
         height: height,
         minHeight: minHeight,
         maxHeight: maxHeight,
         weight: weight,
         minWeight: minWeight,
         maxWeight: maxWeight,
         temperament: temperament,
         life_span: life_span,
         breedGroup: breedGroup,
     });
     console.log(newDog)

      for(let i = 0; i < temperament.length; i++){
       const temper = await Temperament.findOne({
         where:{
           name: temperament[i]
         }
       })
       await newDog.addTemperament(temper)
      };

     res.send(newDog)
    
    }catch(error){
      res.status(404).send(error)
    };
    };




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function createTemperaments(){

    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?`)
    const result = response.data
    let array = []

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
      console.log(Temperament)
      };

      //createTemperaments();

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

    async function CreateTemperaments (req, res){
      const { temperament } = req.body
      console.log(temperament);
      try{
        const NewTemperament = await Temperament.findOrCreate({
        where:{
          name: temperament
        } 
        })
      res.send(NewTemperament)
    }catch(error){
      res.status(404).send(error)
    }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = {getDogs, getTemperaments, GetDogById, createDog, CreateTemperaments};