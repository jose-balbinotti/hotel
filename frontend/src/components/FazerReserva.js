import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import DatePicker, { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt-BR";
import './index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addDays } from 'date-fns';

registerLocale("pt-BR", pt)

export const FazerReserva = () => {
    const [reserva, setReserva] = useState({});
    const [startDate, setStartDate] = useState(addDays(new Date(), 1));
    const [endDate, setEndDate] = useState(addDays(new Date(), 2));
    const navigate = useNavigate();
    const [listaCliente, setListaCliente] = useState([]);
    const [listaQuarto, setListaQuarto] = useState([]);
    const [validated, setValidated] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3001/listar-clientes').then((response) => {
            setListaCliente(response.data)
        })
        axios.get('http://localhost:3001/listar-quartos').then((response) => {
            setListaQuarto(response.data)
        })
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target
        setReserva({
            ...reserva,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        setReserva({
            ...reserva,
            data_ini: startDate,
            data_fim: endDate,
        });
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const reservaComDatas = {
                ...reserva,
                cancelarUmDiaAntes: true,
                checkIn: false,
                data_ini: startDate,
                data_fim: endDate
            }
            console.log(reservaComDatas)
            axios.post('http://localhost:3001/cadastrar-reserva', reservaComDatas)
            setShow(true)
        }
        setValidated(true);
    }

    const handleClose = () => {
        setShow(false)
        navigate("/reservas", { replace: true })
    }

    return (
        <Container>
            <h4>Fazer reserva</h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="form-group">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Select aria-label="Cliente" name="cliente" onChange={handleChange} required>
                        <option selected disabled value="">Selecione um cliente</option>
                        {listaCliente && listaCliente.length > 0 && listaCliente.map((cliente) => <option key={cliente._id} value={cliente._id}>{cliente.nome}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Esse é um campo obrigatório</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Tipo de quarto</Form.Label>
                    <Form.Select name="quarto" onChange={handleChange} id="validationCustom04" required>
                        <option selected disabled value="">Selecione o tipo de quarto</option>
                        {listaQuarto && listaQuarto.length > 0 && listaQuarto.map((quarto) => <option key={quarto.id} value={quarto.id}>{quarto.tipo}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Esse é um campo obrigatório</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group">
                    <Row className="align-items-center">
                        <Col md="auto">
                            <Form.Label>Data de chegada</Form.Label>
                        </Col>
                        <Col md="auto">
                            <DatePicker 
                                // disabled
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                locale={pt}
                                minDate={new Date()}
                                startDate={startDate}
                                endDate={endDate}
                                // excludeDates={excludedDates}
                                placeholderText="Selecione uma data"
                                dateFormat="dd/MM/yyyy"
                                withPortal
                                className="form-control"
                            />
                        </Col>
                        <Col md="auto">
                            <Form.Label>Data de saída</Form.Label>
                        </Col>
                        <Col md="auto">
                            <DatePicker 
                                // disabled
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                locale={pt}
                                minDate={startDate}
                                startDate={startDate}
                                endDate={endDate}
                                // excludeDates={excludedDates}
                                placeholderText="Selecione uma data"
                                dateFormat="dd/MM/yyyy"
                                withPortal
                                className="form-control"
                            />
                        </Col>
                    </Row>
                    <Form.Control.Feedback type="invalid">Esse é um campo obrigatório</Form.Control.Feedback>
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