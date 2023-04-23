const database = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
class TurmaController {
  static async pegaTodasAsTurmas(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};

    data_inicial || data_final ? (where.data_inicio = {}) : null;
    data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null;
    data_final ? (where.data_inicio[Op.lte] = data_final) : null;

    try {
      const todasAsTurmas = await database.Turmas.findAll({ where });
      return res.status(200).json(todasAsTurmas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUmaTurma(req, res) {
    try {
      const { id } = req.params;
      const turma = await database.Turmas.findOne({
        where: { id: Number(id) },
      });
      res.status(200).json(turma);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async criaTurma(req, res) {
    const novaTurma = req.body;
    try {
      const novaTurmaCriada = await database.Turmas.create(novaTurma);
      return res.status(201).json(novaTurmaCriada);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async atualizaTurma(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;

    try {
      await database.Turmas.update(novasInfos, { where: { id: id } });
      const turmaAtualizada = await database.Turmas.findOne({
        where: { id: Number(id) },
      });

      return res.status(200).json(turmaAtualizada);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async apagaTurma(req, res) {
    const { id } = req.params;
    try {
      await database.Turmas.destroy({ where: { id: id } });
      return res
        .status(200)
        .json({ mensagem: `Registro com o id ${id} foi deletado com sucesso` });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = TurmaController;
