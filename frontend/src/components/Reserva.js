import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Reserva = () => {
    const [listaReserva, setListaReserva] = useState(null);
    const [listaCliente, setListaCliente] = useState(null);
    const [listaQuarto, setListaQuarto] = useState(null);
    const [nomeCliente, setNomeCliente] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/listar-reservas').then((response) => {
            setListaReserva(response.data);
        })
        axios.get('http://localhost:3001/listar-quartos').then((response) => {
            setListaQuarto(response.data)
        })
        axios.get('http://localhost:3001/listar-clientes').then((response) => {
            setListaCliente(response.data);
        })
    }, []);

    const adicionaZero = (numero) => {
        if (numero <= 9) 
            return "0" + numero;
        else
            return numero; 
    }

    const formataData = (data) => {
        let dataAtual = new Date(data);
        let dataAtualFormatada = (adicionaZero(dataAtual.getDate().toString()) + "/" + (adicionaZero(dataAtual.getMonth()+1).toString()) + "/" + dataAtual.getFullYear());
        return dataAtualFormatada
    }

    return (
        <Container>
            <h4>Lista de reservas</h4>
            <Table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Tipo do quarto</th>
                        <th>Data de chegada</th>
                        <th>Data de saída</th>
                        <th>Check-in</th>
                        <th>Pode cancelar?</th>
                    </tr>
                </thead>
                <tbody>
                    {listaReserva && listaReserva.length > 0 && listaReserva.map((reserva) => 
                        <tr key={reserva._id}>
                            <td>{listaCliente && listaCliente.length > 0 && listaCliente.map((cliente) => (cliente._id == reserva.clientes_id) && cliente.nome)}</td>
                            <td>{listaQuarto && listaQuarto.length >0 && listaQuarto.map((quarto) => (quarto.id == reserva.quartos_id) && quarto.tipo)}</td>
                            <td>{formataData(reserva.dataIni)}</td>
                            <td>{formataData(reserva.dataFin)}</td>
                            <td>{reserva.checkIn ? "Sim" : "Não"}</td>
                            <td>{reserva.cancelarUmDiaAntes ? "Sim" : "Não"}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Link to="/fazer-reserva"><Button variant="dark">Fazer reserva</Button></Link>
        </Container>
    )
}