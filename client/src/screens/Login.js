import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import utils from '../utils';
import { Button, Form, ToastContainer, Toast  } from 'react-bootstrap';

const LoginPage = () => {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [user, setUser] = useState({
    login: "",
    password: ""
  })


  const setLogin = (e) => {

    user.login = e.target.value
    setUser(user)
  }

  const setPassword = (e) => {

    user.password = e.target.value
    setUser(user)
  }

  const login = () => {


    axios({
      method: "POST",
      url: "http://localhost:8081/users/login",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: user
    }).then((response) => {

      if (!utils.isEmptyOrNullOrUndefined(response.data)) {

        localStorage.setItem("user", JSON.stringify(user))
        navigate("/worktime")

      } else {

        setMessageToast("Não foi encontrado nenhum funcionário com estas credenciais.")
        setShowToast(true)

      }

    }).catch((error) => {

      setMessageToast("Não foi encontrado nenhum funcionário com estas credenciais.")
      setShowToast(true)
      console.log(error)

    })
  }

  const handleSubmit = (event) => {

    const form = event.currentTarget;

    event.preventDefault();

    form.checkValidity() === false ? event.stopPropagation() : login()
    
    setValidated(true);

  };

  return (
    <>
       <div className='h-100 w-100 login-layout'>

          <div className='login-card'>
            
            <h3>Seja bem vindo ao Laboravi</h3>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Form.Label className='mb-0' >Login*</Form.Label>
                <Form.Control size="sm" type="text" required defaultValue={user.login} onChange={(e) => setLogin(e) }/>
                <Form.Control.Feedback type="invalid">
                  Insira seu login.
                </Form.Control.Feedback>

                <Form.Label className='mb-0' >Senha*</Form.Label>
                <Form.Control size="sm" type="password" required defaultValue={user.password} onChange={(e) => setPassword(e) }/>
                <Form.Control.Feedback type="invalid">
                  Insira sua senha.
                </Form.Control.Feedback>

              <div className='text-center'>

                <Button variant="primary" type='submit' className='mt-3'>
                  Entrar
                </Button>
              
              </div>

            </Form>
          </div>

       </div>

      {/* TOAST */}
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Laboravi</strong>
            <small className="text-muted">1 segundo atrás</small>
          </Toast.Header>
          <Toast.Body>{ messageToast }</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default LoginPage;