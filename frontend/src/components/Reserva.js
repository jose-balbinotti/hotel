import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Reserva = () => {
    return (
        <Container>
            <h4>Lista de reservas</h4>

            <Link to="/fazer-reserva"><Button variant="dark">Fazer reserva</Button></Link>
        </Container>
    )
}