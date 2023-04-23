const Services = require("./Services");
const Sequelize = require("sequelize");
const database = require("../models");

class MatriculasServices extends Services {
  constructor() {
    super("Matriculas");
  }

  async pegaUmaMatricula(matriculaId, estudanteId) {
    return database[this.nomeDoModelo].findOne({
      where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
    });
  }

  async pegaMatriculasPorTurma(turmaId) {
    return database[this.nomeDoModelo].findAndCountAll({
      where: { turma_id: turmaId, status: "confirmado" },
      limit: 20,
      order: [["estudante_id", "ASC"]],
    });
  }

  async pegaTurmasLotadas(lotacaoTurma) {
    return database[this.nomeDoModelo].findAndCountAll({
      where: {
        status: "confirmado",
      },
      attributes: ["turma_id"],
      group: ["turma_id"],
      having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`),
    });
  }
}

module.exports = MatriculasServices;
