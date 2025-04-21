import { sequelize } from "../config/database.config";
import { User } from "../models/user.model";
import { Message } from "../models/message.model";

export const db = {
  sequelize,
  User,
  Message,
};
