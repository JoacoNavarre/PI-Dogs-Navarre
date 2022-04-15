const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      foreginKey: true
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    life_span:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image:{
      type: DataTypes.TEXT,
      defaultValue: "https://s1.eestatic.com/2020/08/11/curiosidades/mascotas/mascotas-perros-curiosidades_512209327_157471851_1706x960.jpg" 
    },
    breedGroup:{
      type: DataTypes.STRING,
      allowNull: false
    },
    temperament:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
