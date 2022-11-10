import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.css';

export const NavbarContent = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">Hotel</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link className='link' to="/quartos">Quartos</Link>
                    <Link className='link' to="/reservas">Reservas</Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}