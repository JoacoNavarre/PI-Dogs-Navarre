const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getDogs, getTemperaments, GetDogById, createDog, CreateTemperaments} = require("../functions/functions.js")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", getDogs);

router.get("/dogs/:id", GetDogById)

router.get("/temperaments", getTemperaments);

router.post("/dog", createDog);

router.post("/createTemperament", CreateTemperaments);

//router.get("/dogs", );

module.exports = router;
