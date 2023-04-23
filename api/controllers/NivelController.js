// const database = require("../models");

const Services = require("../services/Services");
const niveisServices = new Services("Niveis");
class NivelController {
  static async pegaTodosOsNiveis(req, res) {
    try {
      const todosOsNiveis = await niveisServices.pegaTodosOsRegistros();
      return res.status(200).json(todosOsNiveis);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUmNivel(req, res) {
    try {
      const { id } = req.params;
      const nivel = await database.Niveis.findOne({
        where: { id: Number(id) },
      });
      res.status(200).json(nivel);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async criaNivel(req, res) {
    const novoNivel = req.body;
    try {
      const novoNivelCriado = await database.Niveis.create(novoNivel);
      return res.status(201).json(novoNivelCriado);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async atualizaNivel(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;

    try {
      await database.Niveis.update(novasInfos, { where: { id: id } });
      const nivelAtualizado = await database.Niveis.findOne({
        where: { id: Number(id) },
      });

      return res.status(200).json(nivelAtualizado);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async apagaNivel(req, res) {
    const { id } = req.params;
    try {
      await database.Niveis.destroy({ where: { id: id } });
      return res
        .status(200)
        .json({ mensagem: `Registro com o id ${id} foi deletado com sucesso` });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = NivelController;
