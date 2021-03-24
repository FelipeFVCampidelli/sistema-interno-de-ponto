import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Select from 'react-select'
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import {Link} from "react-router-dom"

import './edit.css';

export default function Edit(props) {
  const {handleEmailEditChange, handlePhoneEditChange, handleNameEditChange,
         handlePasswordEditChange, handleSelectChangeEdit, handleSubmitEdit, optionsE} = props.formHandlersEdit;
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
            <h1>Página de Edição</h1>
            <Form onSubmit={handleSubmitEdit}>
              <Form.Group>
                <Form.Label>Selecione o usuário a ser editado</Form.Label>
                <Select className="FormEdit" placeholder="Digite o nome do perfil a ser editado" styles="neutral190" 
                        onChange={handleSelectChangeEdit} options={optionsE}/>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control onChange={handleEmailEditChange} type="email" placeholder="Insíra o novo email" />
                </Form.Group>
                <Form.Group controlId="formBasicPhone">
                  <Form.Label>Número de Contato</Form.Label>
                  <Form.Control onChange={handlePhoneEditChange} type="phone" placeholder="Insíra o novo número de contato (XX) XXXX-XXXX" />
                </Form.Group>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Nome de usuário</Form.Label>
                  <Form.Control onChange={handleNameEditChange} type="username" placeholder="Insíra o novo nome de usuário" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control onChange={handlePasswordEditChange} type="password" placeholder="Insira a nova senha" />
                </Form.Group>
                <Button variant="warning" type="editar">Editar</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}