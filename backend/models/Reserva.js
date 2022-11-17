const mongoose = require('mongoose')

const ReservaSchema = new mongoose.Schema({
    dataIni: {
        type: Date,
        required: true,
    },
    dataFin: {
        type: Date,
        required: true,
    },
    checkIn: {
        type: Boolean,
        required: true,
    },
    cancelarUmDiaAntes: {
        type: Boolean,
        required: true,
    },
    quartos_id: {
        type: String,
        required: true
    },
    clientes_id: {
        type: String,
        required: true
    }
})

const Reserva = mongoose.model("reserva", ReservaSchema)
module.exports = Reserva