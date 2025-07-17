import connection from '../utils/DbConnection.js';
import { DataTypes } from 'sequelize';

const Pokemons = connection.define("Pokemons", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Types',
            key: 'id',
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
    regionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Regions',
            key: 'id',
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
}, {
    tableName: 'Pokemons',
});

export default Pokemons;