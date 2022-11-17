const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const ClienteModel = require('./models/Cliente')
const ReservaModel = require('./models/Reserva')

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://pucpr:pucpr2022@cluster0.rbpd06e.mongodb.net/somativa2", {
    useNewUrlParser: true,
})

app.get('/listar-clientes', async (req, res) => {
    ClienteModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }

        res.send(result)
    })
})

//Cadastrar cliente
app.post('/cadastrar-cliente', async (req, res) => {

    const nome = req.body.nome
    const email = req.body.email
    const telefone = req.body.telefone
    const endereco = req.body.endereco
    const nacionalidade = req.body.nacionalidade

    const cliente = new ClienteModel({
        nome: nome,
        email: email,
        telefone: telefone,
        endereco: endereco,
        nacionalidade: nacionalidade
    })

    try {
        await cliente.save()
        res.send('dados inseridos')
    } catch (err) {
        console.log(err)
    }
})

//Cadastrar reserva
app.post('/cadastrar-reserva', async (req, res) => {

    const dataIni = req.body.dataIni
    const dataFin = req.body.dataFin
    const checkIn = false
    const cancelarUmDiaAntes = true
    const quartos_id = req.body.quarto
    const clientes_id = req.body.cliente

    const reserva = new ReservaModel({
        dataIni: dataIni,
        dataFin: dataFin,
        checkIn: checkIn,
        cancelarUmDiaAntes: cancelarUmDiaAntes,
        quartos_id: quartos_id,
        clientes_id: clientes_id,
    })

    try {
        await reserva.save()
        res.send('dados inseridos')
    } catch (err) {
        console.log(err)
    }
})

app.listen(3001, () => {
    console.log("Server running on port 3001")
})