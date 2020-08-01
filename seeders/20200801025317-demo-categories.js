"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Categories", [
      {
        name: "Entertainment",
      },
      {
        name: "History",
      },
      {
        name: "Sports",
      },
      {
        name: "Science",
      },
      {
        name: "Words and Their Meanings",
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
