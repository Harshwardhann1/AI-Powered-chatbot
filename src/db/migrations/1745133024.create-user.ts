import { DataTypes } from 'sequelize';

export = {
  up: async ({ context: queryInterface }: { context: any }) => {
    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },

  down: async ({ context: queryInterface }: { context: any }) => {
    await queryInterface.dropTable('Users');
  }
};
