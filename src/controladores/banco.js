const {format} = require('date-fns')

let bancoDeDados = require('../bancodedados');

const listarContasBancarias = (req, res) => {
    if(bancoDeDados.contas.length === 0) {
        return res.status(204).json();
    }

    res.status(200).json(bancoDeDados.contas);
}

const criarConta = (req,res) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body
    let identificador = bancoDeDados.contas.length
    
    const inscreverConta = {
        numero: ++identificador,
        saldo: 0,
        usuario: {
            nome: nome.trim(),
            cpf: cpf.trim(),
            data_nascimento: data_nascimento.trim(),
            telefone: telefone.trim(),
            email: email.trim(),
            senha: senha.trim()
        },
    }
    
    bancoDeDados.contas.push(inscreverConta);
    res.status(201).json()
}

const atualizarUsuario = (req, res) => {
    const {numeroConta} = req.params;
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body

    const encontrarId = bancoDeDados.contas.find((conta) => {    
        return conta.numero === Number(numeroConta);
    })

    if(nome) {
        encontrarId.usuario.nome = nome
    }
    
    if(cpf) {
        encontrarId.usuario.cpf = cpf
    }

    if(data_nascimento) {
        encontrarId.usuario.data_nascimento = data_nascimento
    }

    if(telefone) {
        encontrarId.usuario.telefone = telefone
    }

    if(email) {
        encontrarId.usuario.email = email
    }

    if(senha) {
        encontrarId.usuario.senha = senha
    }
    

    res.status(204).json()
}

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;

    bancoDeDados.contas = bancoDeDados.contas.filter((conta) => {
        return conta.numero !== Number(numeroConta)
    })

    return res.status(200).json()
}

const depositarConta = (req, res) => {
    let {numero_conta, valor} = req.body

    const encontrarId = bancoDeDados.contas.find((el) => {
        return el.numero === Number(numero_conta);
    })

    encontrarId.saldo += Number(valor);

    const depositos = {
        data: (format(new Date(), "yyyy-MM-dd KK:mm:ss")),
        numero_conta: numero_conta,
        valor: valor
    }

    bancoDeDados.depositos.push(depositos)

    res.status(200).json();
}

const sacarConta = (req, res) => {
    const {numero_conta, valor} = req.body
    
    const encontrarId = bancoDeDados.contas.find((el) => {
        return el.numero === Number(numero_conta);
    })

    if ((encontrarId.saldo - Number(valor)) <= 0) {
        return res.status(400).json({ Mensagem: "Não há valor disponível para o saque." })
    }

    encontrarId.saldo -= valor;

    const saque = {
        data: (format(new Date(), "yyyy-MM-dd KK:mm:ss")),
        numero_conta: numero_conta,
        valor: valor
    }

    bancoDeDados.saques.push(saque)

    res.status(200).json();
}

const transferirDinheiro = (req, res) => {
    const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body;

    const encontrarIdOrigem = bancoDeDados.contas.find((el) => {
        return el.numero === Number(numero_conta_origem);
    })

    const encontrarIdDestino = bancoDeDados.contas.find((el) => {
        return el.numero === Number(numero_conta_destino);
    })
    
    const transferencia = {
        data: (format(new Date(), "yyyy-MM-dd KK:mm:ss")),
        numero_conta_origem: numero_conta_origem,
        numero_conta_destino: numero_conta_destino,
        valor: valor
    }

    bancoDeDados.transferencias.push(transferencia)

    encontrarIdOrigem.saldo -= valor;
    encontrarIdDestino.saldo += valor;

    res.status(200).json()
}

const verificarSaldoConta = (req, res) => {
    const {numero_conta, senha} = req.query

    const encontrarId = bancoDeDados.contas.find((el) => {
        return el.numero === Number(numero_conta);
    })

    if(Number(senha) !== encontrarId.usuario.senha) {
        return res.status(400).json('SENHA INCORRETA')
    }

    res.json({saldo: encontrarId.saldo})
}

const extratoBancario = (req, res) => {
    const {numero_conta, senha} = req.query

    const encontrarId = bancoDeDados.contas.find((el) => {
        return el.numero === Number(numero_conta);
    })

    const encontrarDeposito = bancoDeDados.depositos.filter((el) => {
        return el.numero_conta === numero_conta;
    })

    const encontrarSaque = bancoDeDados.saques.filter((el) => {
        return el.numero_conta === numero_conta;
    })

    const encontrarTransferenciasRecebidas = bancoDeDados.transferencias.filter((el) => {
        return el.numero_conta_destino === numero_conta;
    })

    const encontrarTransferenciasEnviadas = bancoDeDados.transferencias.filter((el) => {
        return el.numero_conta_origem === numero_conta;
    })


    if(Number(senha) !== encontrarId.usuario.senha) {
        return res.status(400).json('SENHA INCORRETA')
    }

    res.json({
        depositos: encontrarDeposito,
        saques: encontrarSaque,
        transferenciasEnviadas: encontrarTransferenciasEnviadas,
        transferenciasRecebidas: encontrarTransferenciasRecebidas
    })
}

module.exports = {
    listarContasBancarias,
    criarConta,
    atualizarUsuario,
    excluirConta,
    depositarConta,
    sacarConta,
    transferirDinheiro,
    verificarSaldoConta,
    extratoBancario
}