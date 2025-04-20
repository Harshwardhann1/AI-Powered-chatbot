import { sequelize } from "./config/database.config";
import { User } from "./models/user.model";

export const db = {
  sequelize,
  User
};
