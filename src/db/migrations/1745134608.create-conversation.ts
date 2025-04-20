import { DataTypes } from 'sequelize';

export = {
  up: async ({ context: queryInterface }: { context: any }) => {
    await queryInterface.createTable('Messages', {
      id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      role: {
        type: DataTypes.ENUM('user', 'bot'),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },

  down: async ({ context: queryInterface }: { context: any }) => {
    await queryInterface.dropTable('Messages');
  },
};
