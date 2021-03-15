import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {useState, useRef} from 'react';
import Axios from 'axios';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import {Link} from "react-router-dom"
import './ponto.css';

export default function Ponto(props) {
  let [retroactiveMode, setRetroactiveMode] = useState(true)
  let retroactiveInput = (
    <div className="timeForms">
      <label htmlFor="startDate">
        <p>De</p>
        <input type="datetime-local" name="startDate"></input>
      </label>
      <label htmlFor="endDate">
        <p>Até</p>
        <input type="datetime-local" name="endDate"></input>
      </label>
    </div>
  )
  //////////////////////////////////
  //implementação cronometro tempo//
  //////////////////////////////////
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const countRef = useRef(null)
  const handleStart = (event) => {
    if (retroactiveMode === false) {
      setRetroactiveMode(true)
      document.getElementById("retroactiveButton").className = "fas fa-plus"
    } 
    setIsActive(true)
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
    handleSubmitStart(event)
  }
  const handleReset = (event) => {
    clearInterval(countRef.current)
    setIsActive(false)
    setIsPaused(false)
    setTimer(0)
    handleSubmitStop(event)
  }
  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
    return `${getHours}:${getMinutes}:${getSeconds}`
  }
  ////////////////////////    
  //fim da implementação//
  ////////////////////////
  const id = props.id

  function handleSubmitStart(event){
    event.preventDefault();
    Axios.get(`http://localhost:4001/user/start/${id}`)
    .then((res) => {if(res.status === 200) {
      console.log("STARTOU")
    }})
    .catch(function (err){console.log(err.response);})
  }
  
  function handleSubmitStop(event){
    event.preventDefault();
    Axios.get(`http://localhost:4001/point/end/${id}`)
    .then((res) => {if(res.status === 200) {
      console.log("PAROU")
    }})
    .catch(function (err){console.log(err.response);})
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand><Link to="/">Home </Link></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link><Link to="/login">Login</Link></Nav.Link>
            <Nav.Link><Link to="/ponto">Ponto</Link></Nav.Link>
          </Nav>
      </Navbar>
      <Container fluid>
        <Row>
          <Col>
            <h1>Página de Pontos</h1>
            <div className="stopwatch">
            <Card bg="dark" border="info" style={{ height: '50px' }}>
              <Card.Body>
                {retroactiveMode ? <p className="timeCounter">{formatTime()}</p> : retroactiveInput}
              </Card.Body>
            </Card>
              {
              !isActive && !isPaused ?
                <Button variant="dark" onClick={handleStart}><i className="fas fa-play"></i>Iniciar</Button>
                : (
                  isPaused ?
                    <Button variant="dark" onClick={handleReset}><i className="fas fa-stop"></i>Parar</Button> 
                    : <Button variant="dark" onClick={handleStart}><i className="fas fa-play"></i>Iniciar</Button>
                )
              }
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}