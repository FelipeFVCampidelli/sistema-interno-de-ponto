import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import {Link} from 'react-router-dom'
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

import './diretor.css';

export default function Perfil(props) {
  const id = props.id
  const idS = props.formHandlersBusca.idS
  const {handleSelectChange, handleSubmitDeletePoints, options} = props.formHandlersBusca
  const [perfilD, setPerfilD] = useState({username: '', email: '', phone: '', users: [{username: '', points: {sum: '', times:['']}}]});
  useEffect(() => {
    Axios.get(`http://localhost:4001/user/diretor/${id}`).then(res => {setPerfilD(res.data)})
    .catch((err) => {console.error("ops! ocorreu um erro " + err.response);})
  }, [id])
  const renderUser = (user, index) => {
    return (
      <tr key={index}>
        <td>{user.username}</td>
        <td>{user.points.times[0]}</td>
        <td>{user.points.times[1]}</td>
        <td>{user.points.times[2]}</td>
        <td>{user.points.times[3]}</td>
        <td>{user.points.times[4]}</td>
        <td>{user.points.sum}</td>
      </tr>
    )
  }
  const RotaDinamicaBusca = { pathname: `/busca/${idS}`, idS: idS }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand><Link to="/">Home </Link></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link><Link to="/diretor">Diretor</Link></Nav.Link>
            <Nav.Link><Link to="/ponto">Ponto</Link></Nav.Link>
          </Nav>
      </Navbar>
      <Container fluid>
        <Row>
          <Col>
            <h1>Diretor</h1>
            <p>Nome: {perfilD.username} </p>
            <p>Email: {perfilD.email} </p>
            <p>Telefone: {perfilD.phone} </p>
            <Link to="/cadastro"><Button className="verde" variant="success">Cadastrar</Button></Link>
            <Link to="/edit"><Button className="amarelo" variant="warning" type="editar">Editar</Button></Link>
            <Link to="/delete"><Button className="vermelho" variant="danger" type="excluir">Excluir</Button></Link>
            <Form className="FormDiretorP" inline>
              <Select className="FormDiretor" styles="neutral190" onChange={handleSelectChange} options={options} value={options.id}/>
              <Link to={RotaDinamicaBusca}><Button type="submit" variant="outline-light">Search</Button></Link>
            </Form>
          </Col>
        </Row>
      </Container>
      <h2>Tabela de Pontos</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Segunda</th>
            <th>Terça</th>
            <th>Quarta</th>
            <th>Quinta</th>
            <th>Sexta</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{perfilD.users.map(renderUser)}</tbody>
      </Table>
      <Form onSubmit={handleSubmitDeletePoints}>
        <Button className="deletePoints" variant="danger" type="excluir">Limpar pontos da semana</Button>
      </Form>
    </div>
  );
}
