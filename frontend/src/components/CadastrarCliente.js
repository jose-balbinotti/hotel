import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './index.css'

export const CadastrarCliente = () => {
    const [cliente, setCliente] = useState({})
    const [nacionalidades, setNacionalidades] = useState(null)
    const [validated, setValidated] = useState(false)
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        axios('../../nacionalidades.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            setNacionalidades(response.data)
        }).catch(error => {
            console.error("Error fetching data", error)
        })
    },[])

    const handleChange = (event) => {
        const {name, value} = event.target
        setCliente({
            ...cliente,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            axios.post('http://localhost:3001/cadastrar-cliente', cliente)
            setShow(true)
        }
        setValidated(true);
    }

    const handleClose = () => {
        setShow(false)
        navigate("/clientes", { replace: true })
    }

    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="form-group">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" name="nome" value={cliente.nome} placeholder="Nome" onChange={handleChange} required/>
                    <Form.Control.Feedback type="invalid">Esse é um campo obrigatório</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" name="email" value={cliente.email} placeholder="E-mail" onChange={handleChange} required/>
                    <Form.Control.Feedback type="invalid">Esse é um campo obrigatório</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="text" name="telefone" value={cliente.telefone} placeholder="Telefone" onChange={handleChange} required/>
                    <Form.Control.Feedback type="invalid">Esse é um campo obrigatório</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control type="text" name="endereco" value={cliente.endereco} placeholder="Endereço" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Nacionalidade</Form.Label>
                    <Form.Select name="nacionalidade" onChange={handleChange}>
                        <option>Selecione um país</option>
                        {nacionalidades && nacionalidades.length > 0 && nacionalidades.map((item) => <option key={item.sigla}>{item.nome_pais}</option>)}
                    </Form.Select>
                </Form.Group>
                <Button variant="dark" type="submit">Salvar</Button>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Sucesso</Modal.Title>
                </Modal.Header>
                <Modal.Body>Dados salvos com sucesso!</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}



