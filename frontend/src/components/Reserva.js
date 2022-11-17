import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Reserva = () => {
    const [listaReserva, setListaReserva] = useState(null);
    const [listaCliente, setListaCliente] = useState(null);
    const [listaQuarto, setListaQuarto] = useState(null);
    const [showCancel, setShowCancel] = useState(false);
    const [showCheckIn, setShowCheckIn] = useState(false);
    const [dataIni, setDataIni] = useState(false);
    const [reserva, setReserva] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/listar-reservas').then((response) => {
            console.log(response.data)
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

    const cancelarUmDiaAntes = (data_ini) => {
        const dataIni = new Date(data_ini)
        const dataFin = new Date()
        const diffTime = Math.abs(dataFin - dataIni);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays >= 1) {
            return true
        } else {
            return false
        }
    }

    const handleClick = (reserva, type) => {
        (type === 'checkin') ? setShowCheckIn(true) : setShowCancel(true)
        setReserva(reserva)
    }

    const handleCancelarReserva = () => {
        axios.delete('http://localhost:3001/cancelar-reserva/'+reserva._id)
        setShowCheckIn(false)
        setShowCancel(false)
        window.location.reload()
    }

    const handleCheckIn = () => {
        axios.put('http://localhost:3001/fazer-checkin/'+reserva._id)
        setShowCheckIn(false)
        setShowCancel(false)
        window.location.reload()
    }

    const handleClose = () => {
        setShowCheckIn(false)
        setShowCancel(false)
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
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaReserva && listaReserva.length > 0 && listaReserva.map((reserva) => 
                        <tr key={reserva._id}>
                            <td>{reserva.cliente.map((client) => client.nome)}</td>
                            <td>{listaQuarto && listaQuarto.length >0 && listaQuarto.map((quarto) => (quarto.id == reserva.quartos_id) && quarto.tipo)}</td>
                            <td>{formataData(reserva.dataIni)}</td>
                            <td>{formataData(reserva.dataFin)}</td>
                            <td>{reserva.checkIn ? "Check-in realizado" : <Button variant="dark" onClick={() => handleClick(reserva, 'checkin')}>Fazer check-in</Button>}</td>
                            {/* <td>{cancelarUmDiaAntes(reserva.dataIni) ? "Sim" : "Por não cancelar com um dia de antecedência, você deve pagar o valor de uma diária"}</td> */}
                            <td><Button variant="dark" onClick={() => handleClick(reserva, 'cancelar')}>Cancelar reserva</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={showCancel} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>ATENÇÃO</Modal.Title>
                </Modal.Header>
                <Modal.Body>Você deseja cancelar essa reserva?<br/>
                    {!cancelarUmDiaAntes(dataIni) && "Por não cancelar com um dia de antecedência, você deve pagar o valor de uma diária. Deseja cancelar mesmo assim?"}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Não
                    </Button>
                    <Button variant="primary" onClick={handleCancelarReserva}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showCheckIn} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>ATENÇÃO</Modal.Title>
                </Modal.Header>
                <Modal.Body>Você deseja fazer o check-in?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Não
                    </Button>
                    <Button variant="primary" onClick={handleCheckIn}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>

            <Link to="/fazer-reserva"><Button variant="dark">Fazer reserva</Button></Link>
        </Container>
    )
}