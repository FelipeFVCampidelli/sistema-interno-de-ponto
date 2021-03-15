import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import {Link, useParams} from "react-router-dom"
import Axios from 'axios'
import './delete.css';

export default function Delete(props) {
  
  const {id} = useParams()
  //GET de perfil
  const [perfil, setPerfil] = useState( {username: '', email: '', phone: '', points: {times: [''], sum: ''}} );
  useEffect(() => {
    Axios.get(`http://localhost:4001/user/perfil/${id}`).then(res => {
      setPerfil(res.data)
    }).catch((err) => {console.error("ops! ocorreu um erro " + err.response);})
  }, [id])
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand><Link to="/">Home </Link></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link><Link to="/login">Login</Link></Nav.Link>
            <Nav.Link><Link to="/perfil">Diretor</Link></Nav.Link>
            <Nav.Link><Link to="/ponto">Ponto</Link></Nav.Link>
          </Nav>
      </Navbar>
      <Container fluid>
        <Row>
          <Col>
            <h1>Página de Perfil</h1>
            <p>Nome: {perfil.username} </p>
            <p>Email: {perfil.email} </p>
            <p>Telefone: {perfil.phone} </p>
          </Col>
        </Row>
      </Container>
      <h1>Pontos Marcados</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Segunda</th>
            <th>Terça</th>
            <th>Quarta</th>
            <th>Quinta</th>
            <th>Sexta</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{perfil.points.times[0]}</td>
            <td>{perfil.points.times[1]}</td>
            <td>{perfil.points.times[2]}</td>
            <td>{perfil.points.times[3]}</td>
            <td>{perfil.points.times[4]}</td>
            <td>{perfil.points.sum}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}