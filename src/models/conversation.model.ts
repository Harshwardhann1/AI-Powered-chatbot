import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.config';
import { User } from './user.model';

export interface IMessage extends Model {
  id: number;
  userId: number;
  role: 'user' | 'bot';
  content: string;
  createdAt?: Date;
}

export const Message = sequelize.define<IMessage>('Message', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  role: { type: DataTypes.ENUM('user', 'bot'), allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false }
});

Message.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Message, { foreignKey: 'userId' });
