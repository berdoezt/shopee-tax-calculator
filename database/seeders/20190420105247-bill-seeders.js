'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('bills', [
      {
        name:"Lucky Stretch",
        tax_code:2,
        price:1000,
        state:1
      },
      {
        name:"Big Mac",
        tax_code:1,
        price:1000,
        state:1
      },
      {
        name:"Movie",
        tax_code:3,
        price:150,
        state:1
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
