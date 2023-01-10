const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router.get("/pessoas", PessoaController.pegaPessoasAtivas);
router.get("/pessoas/todos", PessoaController.pegaTodasAsPessoas);
router.get("/pessoas/:id", PessoaController.pegaUmaPessoa);
router.post("/pessoas", PessoaController.criaPessoa);
router.put("/pessoas/:id", PessoaController.atualizaPessoa);
router.delete("/pessoas/:id", PessoaController.apagaPessoa);
router.get("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.pegaUmaMatricula);
router.post("/pessoas/:estudanteId/matricula", PessoaController.criaMatricula);
router.put("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.atualizaMatricula);
router.delete("/pessoas/:estudanteId/matricula/:matriculaId", PessoaController.apagaMatricula);
router.post("/pessoas/:id/restaura", PessoaController.restauraPessoa);

module.exports = router;
