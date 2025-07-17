import connection from '../utils/DbConnection.js';
import PokemonsModel from '../models/PokemonsModel.js';
import RegionsModel from '../models/RegionsModel.js';
import TypesModel from '../models/TypesModel.js';

connection.authenticate()
    .then(() => {
        console.log("Database connection has been established successfully");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });
    
// Relations
PokemonsModel.belongsTo(TypesModel, {foreignKey: "typeId"});
TypesModel.hasMany(PokemonsModel, {foreignKey: "typeId"});

PokemonsModel.belongsTo(RegionsModel, {foreignKey: "regionId"});
RegionsModel.hasMany(PokemonsModel, {foreignKey: "regionId"});

export default {
    Sequelize: connection,
    PokemonsModel, 
    RegionsModel,
    TypesModel
}