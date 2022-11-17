const mongoose = require('mongoose')

const QuartoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    numero: {
        type: Number,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    valor: {
        type: Number,
    },
    necessidadesEspeciais: {
        type: Boolean,
    },
    hotels_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'hotels'
    }
})

const Quarto = mongoose.model("quarto", QuartoSchema)
module.exports = Quarto