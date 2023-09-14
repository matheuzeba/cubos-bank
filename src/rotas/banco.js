const {Router} = require('express');
const banco = require('../controladores/banco')

const senha = require('../middlewares/senha')
const middlewares = require('../middlewares/banco')

const rota = Router();


rota.get('/contas', senha, banco.listarContasBancarias);
rota.post('/contas', middlewares.checarBody, middlewares.checarCpf, middlewares.checarEmail ,banco.criarConta);
rota.put('/contas/:numeroConta/usuario', middlewares.procurarId, middlewares.checarCpf, middlewares.checarEmail, banco.atualizarUsuario);
rota.delete('/contas/:numeroConta', middlewares.procurarId, middlewares.checarSaldo, banco.excluirConta);
rota.post('/transacoes/depositar', middlewares.checarDeposito, banco.depositarConta);
rota.post('/transacoes/sacar', middlewares.checarDeposito, middlewares.checarSenhaUser, banco.sacarConta);
rota.post('/transacoes/transferir', middlewares.checarUsers, banco.transferirDinheiro);
rota.get('/contas/saldo', banco.verificarSaldoConta);
rota.get('/contas/extrato', banco.extratoBancario);

module.exports = rota