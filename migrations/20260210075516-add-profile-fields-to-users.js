"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "phone", {
      type: Sequelize.STRING(20)
    });

    await queryInterface.addColumn("Users", "bio", {
      type: Sequelize.STRING(255)
    });

    await queryInterface.addColumn("Users", "profileImage", {
      type: Sequelize.STRING
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Users", "phone");
    await queryInterface.removeColumn("Users", "bio");
    await queryInterface.removeColumn("Users", "profileImage");
  }
};
