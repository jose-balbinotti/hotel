import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Reserva = () => {
    const [reserva, setReserva] = useState(null);

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('reservas')))
        setReserva(JSON.parse(localStorage.getItem('reservas')));
    }, []);

    return (
        <Container>
            <h4>Lista de reservas</h4>
            <Table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Tipo do quarto</th>
                        <th>Data de chegada</th>
                        <th>Data de saída</th>
                    </tr>
                </thead>
                <tbody>
                    {reserva && reserva.length > 0 && reserva.map((item) => 
                        <tr>
                            <td>{item.nome}</td>
                            <td>{item.email}</td>
                            <td>{item.tipo_quarto}</td>
                            <td>{item.data_ini}</td>
                            <td>{item.data_fim}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Link to="/fazer-reserva"><Button variant="dark">Fazer reserva</Button></Link>
        </Container>
    )
}