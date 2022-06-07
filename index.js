const axios = require('axios');
// const {Shoes} = require('../db')

// async function GetShoesByGender (req,res){
//     const response = await axios.get(database)
//     const result = response.data;
//     const gender = req.params.gender

//     try{const ShoesByGender = await Shoes.findOne({
//         where:{
//             gender: gender
//         }
//     })
//     res.send(ShoesByGender)
//     }catch(error){
//         res.status(404).send(error)
//     }
// }