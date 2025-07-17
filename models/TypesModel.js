import connection from '../utils/DbConnection.js';
import { DataTypes } from 'sequelize';

const Types = connection.define("Types", {
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
    tableName: 'Types',
});

export default Types;