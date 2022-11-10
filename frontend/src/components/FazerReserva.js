import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import DatePicker, { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt-BR";
import './index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

registerLocale("pt-BR", pt)

export const FazerReserva = () => {
    const [reserva, setReserva] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [nacionalidades, setNacionalidades] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        axios('../../nacionalidades.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            setNacionalidades(response.data);
        }).catch(error => {
            console.error("Error fetching data", error);
        });
    },[])
    

    const handleChange = (event) => {
        const {name, value} = event.target
        setReserva({
            ...reserva,
            [name]: value
        })
    }

    const handleClick = (event) => {
        setReserva({
            ...reserva,
            data_ini: startDate,
            data_fim: endDate,
        });
        event.preventDefault();
        var res = [];
        if (localStorage.getItem('reservas')) {
            const todasReservas = JSON.parse(localStorage.getItem('reservas'));
            res = todasReservas;
        }
        const reservaDatas = {
            ...reserva,
            data_ini: startDate,
            data_fim: endDate
        }
        res.push(reservaDatas);
        localStorage.setItem('reservas', JSON.stringify(res));
        navigate("/reservas", { replace: true });
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
                    <Form.Control type="text" name="endereco" value={reserva.endereco} placeholder="Endereço" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Nacionalidade</Form.Label>
                    <Form.Select name="nacionalidade" onChange={handleChange}>
                        <option>Selecione um país</option>
                        {nacionalidades && nacionalidades.length > 0 && nacionalidades.map((item) => <option key={item.sigla}>{item.nome_pais}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" name="email" value={reserva.email} placeholder="E-mail" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="text" name="telefone" value={reserva.telefone} placeholder="Telefone" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Tipo de quarto</Form.Label>
                    <Form.Select name="tipo_quarto" onChange={handleChange}>
                        <option>Selecione o tipo de quarto</option>
                        <option >Solteiro</option>
                        <option >Casal</option>
                        <option >Família</option>
                        <option >Presidencial</option>
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