import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Cliente = () => {
    const [listaCliente, setListaCliente] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/listar-clientes').then((response) => {
            setListaCliente(response.data)
        })
    }, []);

    return (
        <Container>
            <h4>Lista de clientes</h4>
            <Table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>Nacionalidade</th>
                    </tr>
                </thead>
                <tbody>
                    {listaCliente && listaCliente.length > 0 && listaCliente.map((cliente) => 
                        <tr>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefone}</td>
                            <td>{cliente.endereco}</td>
                            <td>{cliente.nacionalidade}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Link to="/cadastrar-cliente"><Button variant="dark">Cadastrar cliente</Button></Link>
        </Container>
    )
}