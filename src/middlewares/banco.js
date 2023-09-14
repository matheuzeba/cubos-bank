const {banco, contas} = require('../bancodedados.js');

const checarBody = (req, res, next) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body

    if(!req.body.nome || !req.body.cpf || !req.body.data_nascimento || !req.body.telefone || !req.body.email || !req.body.senha) {
        return res.status(400).json({
            message: "Tem algo faltando na sua requisição, sao obrigatorios: o nome, cpf, data de nascimento, telefone, email, senha"
        });
    }

    next();
}

const checarCpf = (req, res, next) => {
    const {cpf} = req.body

    if(!cpf) {
        return res.status(404).json('O CPF DEVE SER INFORMADO');
    }
    
    if(cpf.length < 11 || isNaN(cpf)) {
        return res.status(400).json('O CPF DEVE TER 11 DÍGITOS E DEVE SER COMPOSTO SOMENTE POR NÚMEROS');
    }

    const cpfExiste = contas.find((conta) => {
        return cpf === conta.usuario.cpf
    })

    if (cpfExiste) {
        return res.status(400).json({ Mensagem: "JÁ EXISTE UM USUÁRIO COM O MESMO CPF" })
    }

    next()
}

const checarEmail = (req, res, next) => {
    const {email} = req.body

    if(!email) {
        return res.status(404).json('O EMAIL DEVE SER INFORMADO');
    }
    
    if(!email.includes('@')) {
        return res.status(400).json('EMAIL INVALIDO, LEMBRE-SE DO @');
    }

    const emailExiste = contas.find((conta) => {
        return email === conta.usuario.email
    })

    if (emailExiste) {
        return res.status(400).json({ Mensagem: "JÁ EXISTE UM USUÁRIO COM O MESMO EMAIL" })
    }

    next()
}

const checarSaldo = (req, res, next) => {
    if(procurarId.saldo > 0) {
        return res.status(400).json({mensagem: "A conta só pode ser removida se o saldo for zero!"})
    }

    next()
}

const checarDeposito = (req, res, next) => {
    let {numero_conta, valor} = req.body

    if(!numero_conta || !valor || valor < 0) {
        return res.status(400).json({mensagem: "O NUMERO E VALOR SÃO OBRIGATORIOS, O VALOR DEVE SER MAIOR QUE ZERO!"});
    }

    next();
}

const checarSenhaUser = (req, res , next) => {
    const { numero_conta, senha } = req.body;
    if (!senha) {
        return res.status(400).json({ Mensagem: "A senha é obrigatória." })
    }
    const verificarConta = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })
    if (verificarConta.usuario.senha !== senha) {
        return res.status(400).json({ Mensagem: "A senha informada está incorreta." })
    }
    next();
}

const checarUsers = (req, res, next) => {
    const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body;

    if(!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.json('O NUMERO DE ORIGEM, DE DESTINO, O VALOR E A SENHA SAO OBRIGATORIOS')
    }

    const encontrarIdOrigem = contas.find((el) => {
        return el.numero === Number(numero_conta_origem);
    })

    const encontrarIdDestino = contas.find((el) => {
        return el.numero === Number(numero_conta_destino);
    })

    if(!encontrarIdOrigem) {
        return res.status(404).json('O ID DE ORIGEM NAO EXISTE');
    }

    if(!encontrarIdDestino) {
        return res.status(404).json('O ID DE DESTINO NAO EXISTE');
    }


    if(senha !== encontrarIdOrigem.usuario.senha) {
        return res.status(400).json('A SENHA DO USUARIO ESTA INCORRETA');
    }

    if(encontrarIdOrigem.saldo < valor) {
        return res.status(400).json('O SALDO É INSUFICIENTE PARA A TRANSFERENCIA');
    }

    next()
}

const procurarId = (req, res, next) => {
    const {numeroConta} = req.params;  

    const encontrarId = contas.find((conta) => {    
        return conta.numero === Number(numeroConta);
    })
    
    if(!encontrarId) {
        return res.status(404).json('ID NAO ENCONTRADO')
    }

    next()
}


module.exports = {
    checarBody,
    checarCpf,
    checarEmail,
    procurarId,
    checarSaldo,
    checarDeposito,
    checarSenhaUser,
    checarUsers
}