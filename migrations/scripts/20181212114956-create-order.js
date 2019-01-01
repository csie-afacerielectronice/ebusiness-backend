'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      deliveryAddressId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'addresses',
          key: 'id'
        }
      },
      receiptAddressId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'addresses',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.STRING,
        default: 'received'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};
