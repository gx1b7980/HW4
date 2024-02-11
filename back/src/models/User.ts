import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from './sequelizeInstance.js';

export class User extends Model {
  public id!: number;
  public name!: string; // Added name field
  public email!: string; // Added email field
  public username!: string;
  public passwordHash!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      isEmail: true, // Validates email format
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  timestamps: true,
});

export default User;
