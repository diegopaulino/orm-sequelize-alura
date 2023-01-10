const database = require("../models");

class PessoaController {
  static async pegaPessoasAtivas(req, res) {
    try {
      const pessoasAtivas = await database.Pessoas.findAll();
      return res.status(200).json(pessoasAtivas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.scope("todos").findAll();
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUmaPessoa(req, res) {
    try {
      const { id } = req.params;
      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      res.status(200).json(pessoa);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async criaPessoa(req, res) {
    const novaPessoa = req.body;
    try {
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
      return res.status(201).json(novaPessoaCriada);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async atualizaPessoa(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;

    try {
      await database.Pessoas.update(novasInfos, { where: { id: id } });
      const pessoaAtualizada = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });

      console.log("Novos valores > ", pessoaAtualizada)

      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async apagaPessoa(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.destroy({ where: { id: id } });
      return res
        .status(200)
        .json({ mensagem: `Registro com o id ${id} foi deletado com sucesso` });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async restauraPessoa(req, res) {
    const { id } = req.params;

    try {
      await database.Pessoas.restore({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `id ${id} restaurado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUmaMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      const matricula = await database.Matriculas.findOne({
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
      });
      res.status(200).json(matricula);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const novaMatriculaCriada = await database.Matriculas.create(
        novaMatricula
      );
      return res.status(201).json(novaMatriculaCriada);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const novasInfos = req.body;

    try {
      await database.Matriculas.update(novasInfos, {
        where: { id: matriculaId, estudante_id: estudanteId },
      });
      const matriculaAtualizada = await database.Matriculas.findOne({
        where: { id: Number(matriculaId) },
      });

      return res.status(200).json(matriculaAtualizada);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async apagaMatricula(req, res) {
    const { matriculaId } = req.params;

    try {
      await database.Matriculas.destroy({
        where: { id: matriculaId },
      });
      return res.status(200).json({
        mensagem: `Registro com o id ${matriculaId} foi deletado com sucesso`,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;
