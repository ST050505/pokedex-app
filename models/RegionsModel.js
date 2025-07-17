import connection from '../utils/DbConnection.js';
import { DataTypes } from 'sequelize';

const Regions = connection.define("Regions", {
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
}, {
    tableName: 'Regions',
});

export default Regions;