"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Pessoas",
      [
        {
          nome: "Diego",
          ativo: true,
          email: "diego@diego.com",
          role: "Professor",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: "Raone",
          ativo: true,
          email: "raone@raone.com",
          role: "Professor",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: "Renato",
          ativo: true,
          email: "renato@renato.com",
          role: "Professor",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: "Joãozinho",
          ativo: true,
          email: "joaozinho@joaozinho.com",
          role: "Estudante",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: "José",
          ativo: true,
          email: "jose@jose.com",
          role: "Estudante",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("People", null, {});
  },
};
