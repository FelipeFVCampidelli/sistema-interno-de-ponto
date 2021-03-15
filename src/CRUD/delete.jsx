import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Select from 'react-select'
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import {Link} from "react-router-dom"
import './delete.css';

export default function Delete(props) {
  const {handleSelectChangeDelete, handleSubmitDelete, optionsD} = props.formHandlersDelete;
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand><Link to="/">Home </Link></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link><Link to="/login">Login</Link></Nav.Link>
            <Nav.Link><Link to="/diretor">Diretor</Link></Nav.Link>
            <Nav.Link><Link to="/ponto">Ponto</Link></Nav.Link>
          </Nav>
      </Navbar>
      <Container fluid>
        <Row>
          <Col>
            <h1>Página de Exclusão</h1>
            <Form inline onSubmit={handleSubmitDelete}>
              <Select id="Delete" className="FormDelete" placeholder="Digite o nome do perfil a ser deletado" styles="neutral190" 
                onChange={handleSelectChangeDelete} options={optionsD} value={optionsD.id}/>
              <Button variant="danger" type="excluir">Excluir</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}