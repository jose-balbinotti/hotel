import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import DatePicker, { registerLocale } from "react-datepicker";
import { addMonths, addDays, setHours, setMinutes, getDay } from 'date-fns';
import pt from "date-fns/locale/pt-BR";
import './index.css';

registerLocale("pt-BR", pt)

export const FazerReserva = () => {
    const [reserva, setReserva] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleChange = (event) => {
        const {name, value} = event.target
    }

    const handleClick = () => {

    }

    return (
        <Container>
            <h4>Fazer reserva</h4>
            <Form>
                <Form.Group className="form-group">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" name="nome" value={reserva.nome} placeholder="Nome" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control type="text" value={reserva.endereco} placeholder="Endereço" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Nacionalidade</Form.Label>
                    <Form.Control type="text" value={reserva.nacionalidade} placeholder="Nacionalidade" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" value={reserva.email} placeholder="E-mail" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="text" value={reserva.telefone} placeholder="Telefone" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Tipo de quarto</Form.Label>
                    <Form.Select aria-label="Tipo de quarto" onChange={handleChange}>
                        <option>Selecione o tipo de quarto</option>
                        <option value="1" >Solteiro</option>
                        <option value="2">Casal</option>
                        <option value="3">Família</option>
                        <option value="4">Presidencial</option>
                    </Form.Select>
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
                </Form.Group>
                <Button variant="dark" type="submit" onClick={handleClick}>Salvar</Button>
            </Form>
        </Container>
    )
}