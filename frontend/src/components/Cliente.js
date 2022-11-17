import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Cliente = () => {
    const [listaCliente, setListaCliente] = useState([]);
    const [querySearch, setQuerySearch] = useState("");
    const [searchParam] = useState(["nome", "email", "telefone", "endereco", "nacionalidade"]);

    useEffect(() => {
        axios.get('http://localhost:3001/listar-clientes').then((response) => {
            setListaCliente(response.data)
        })
    }, []);

    const search = (items) => {
        return items.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(querySearch.toLowerCase()) > -1
                );
            });
        });
    }

    return (
        <Container>
            <h4>Lista de clientes</h4>
            <Table>
                <thead>
                    <tr>
                        <input type="text" name="search-form" id="search-form" className="form-control" placeholder="Pesquise" value={querySearch} onChange={(e) => setQuerySearch(e.target.value)} autoComplete="off"/>
                    </tr>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>Nacionalidade</th>
                    </tr>
                </thead>
                <tbody>
                    {listaCliente && listaCliente.length > 0 && search(listaCliente).map((cliente) => 
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