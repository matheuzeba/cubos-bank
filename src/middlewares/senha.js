const {banco} = require('../bancodedados.js')

const checarSenha = (req, res, next) => {
    const senha = req.query.senha_banco;
    if(senha != banco.senha) {
        return res.status(401).json({message: 'Senha invalida!'})
    } else {
        next()
    }
}

module.exports = checarSenha

