const { PessoasServices, MatriculasServices } = require("../services");
const pessoasServices = new PessoasServices();
const matriculasServices = new MatriculasServices();

class PessoaController {
  static async pegaPessoasAtivas(req, res) {
    try {
      const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos();
      return res.status(200).json(pessoasAtivas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros();
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUmaPessoa(req, res) {
    try {
      const { id } = req.params;
      const pessoa = await pessoasServices.pegaUmRegistro(id);
      res.status(200).json(pessoa);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async criaPessoa(req, res) {
    const novaPessoa = req.body;
    try {
      const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa);
      return res.status(201).json(novaPessoaCriada);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async atualizaPessoa(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;

    try {
      await pessoasServices.atualizaRegistro(novasInfos, id);
      const pessoaAtualizada = await pessoasServices.pegaUmRegistro(Number(id));

      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async apagaPessoa(req, res) {
    const { id } = req.params;
    try {
      await pessoasServices.apagaRegistro(id);
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
      await pessoasServices.restauraPessoa(id);
      return res.status(200).json({ mensagem: `id ${id} restaurado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUmaMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      const matricula = await matriculasServices.pegaUmaMatricula(
        estudanteId,
        matriculaId
      );
      res.status(200).json(matricula);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const novaMatriculaCriada = await matriculasServices.criaRegistro(
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
      await matriculasServices.atualizaRegistros(novasInfos, {
        estudante_id: estudanteId,
        id: matriculaId,
      });

      const matriculaAtualizada = await matriculasServices.pegaUmRegistro(
        matriculaId
      );

      console.log(matriculaAtualizada);

      return res.status(200).json(matriculaAtualizada);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async apagaMatricula(req, res) {
    const { matriculaId } = req.params;

    try {
      await matriculasServices.apagaRegistro(matriculaId);

      return res.status(200).json({
        mensagem: `Registro com o id ${matriculaId} foi deletado com sucesso`,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async pegaMatriculas(req, res) {
    const { estudanteId } = req.params;

    try {
      const pessoa = await pessoasServices.pegaUmRegistro(estudanteId);

      const matriculas = await pessoa.getAulasMatriculadas();

      return res.status(200).json(matriculas);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async pegaMatriculasPorTurma(req, res) {
    const { turmaId } = req.params;

    try {
      const todasAsMatriculas = await matriculasServices.pegaMatriculasPorTurma(
        turmaId
      );

      return res.status(200).json(todasAsMatriculas);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async pegaTurmasLotadas(req, res) {
    const lotacaoTurma = 2;
    const turmasLotadas = await matriculasServices.pegaTurmasLotadas(
      lotacaoTurma
    );

    try {
      return res.status(200).json(turmasLotadas.count);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async cancelaPessoa(req, res) {
    const { estudanteId } = req.params;

    try {
      await pessoasServices.cancelaPessoaEMatriculas(estudanteId);

      return res.status(200).json({
        message: `mastriculas ref. ao estudante ${estudanteId} foram canceladas`,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;
