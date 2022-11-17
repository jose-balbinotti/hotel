const mongoose = require('mongoose')

const ClienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    endereco: {
        type: String,
    },
    nacionalidade: {
        type: String,
    }
})

const Cliente = mongoose.model("cliente", ClienteSchema)
module.exports = Cliente