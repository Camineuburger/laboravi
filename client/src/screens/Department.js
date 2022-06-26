import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios'
import { Table, Button, Modal, Form, Col, Row, InputGroup, FormControl, ToastContainer, Toast } from 'react-bootstrap';
import utils from '../utils';

const Department = () => {

  const [show_modal, setShowModal] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [messageToast, setMessageToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [validated, setValidated] = useState(false);
  const [listDepartment, setListDepartment] = useState([]);
  const [department, setDepartment] = useState({
    id: null,
    name: "",
    description: "",
    time_work: 0
  });
  
  useEffect(() => {
    getListDepartment()
  }, [])


  function setTimework() {

    department.time_work = utils.timeToSeconds(hour, minute)
    setDepartment(department)

  }

  const handleCloseModal = () => { 
    setShowModal(false)
    setValidated(false)
  };

  const setName = (e) => {

    department.name = e.target.value
    setDepartment(department)

  }

  const setDescription = (e) => {

    department.description = e.target.value
    setDepartment(department)

  }

  const handleHour = (e) => {

    setHour(e.target.value)

  }

  const handleMinute = (e) => {

    setMinute(e.target.value)

  }

  const save = () => {
    
    let _method = "POST", _url = "http://localhost:8081/department/create"

    if (!utils.isEmptyOrNullOrUndefined(department.id)) {

      _method = "PUT";
      _url = "http://localhost:8081/department/update"

    }

    setTimework()

    axios({
      method: _method,
      url: _url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: department
    }).then((response) => {

      if (response.data === "success") {

        setMessageToast("Departamento salvo com sucesso.")
        setShowToast(true)
        handleCloseModal()

      } else {

        setMessageToast("Houve uma falha ao salvar o departamento.")
        setShowToast(true)

      }

    }).catch((error) => {

      setMessageToast("Houve uma falha ao salvar o departamento.")
      setShowToast(true)
      console.log(error)

    }).finally(() => {

      getListDepartment()

    })
  }

  const getListDepartment = () => {

    axios({
      method: "GET",
      url: "http://localhost:8081/department/all",
    }).then((response) => {

      if (response.data)
        setListDepartment(response.data)

    }).catch((error) => {

      console.log(error)

    })
  }

  const getDepartment = (id) => {

    axios({
      method: "GET",
      url: "http://localhost:8081/department?id=" + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {

      if (response.data) {

        setDepartment(response.data)

        let time = utils.secondsToTime(response.data.time_work)
        setHour(time.hour)
        setMinute(time.minute)

        setShowModal(true)

      }

    }).catch((error) => {

      setMessageToast("Houve uma falha ao buscar os dados do departamento.")
      setShowToast(true)
      console.log(error)

    })

  }

  const deleteDepartment = (id) => {

    axios({
      method: "DELETE",
      url: "http://localhost:8081/department/delete?id=" + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {

      if (response.data === "success") {

        setMessageToast("Departamento deletado com sucesso.")
        setShowToast(true)

      } else {

        setMessageToast("Houve uma falha ao deletar o departamento.")
        setShowToast(true)

      }

    }).catch((error) => {

      setMessageToast("Houve uma falha ao deletar o departamento.")
      setShowToast(true)
      console.log(error)
      
    }).finally(() => {

      getListDepartment()

    })
  }

  const handleSubmit = (event) => {

    const form = event.currentTarget;

    event.preventDefault();

    form.checkValidity() === false ? event.stopPropagation() : save()
    
    setValidated(true);

  };

  return (
    <>
      <Header/>

      <div className='p-4'>

        <Button variant="dark" onClick={() => {setShowModal(true)}}>
          Novo departamento
        </Button>

        <Button className='mx-3' variant="dark" onClick={() => {getListDepartment()}}>
          Atualizar
        </Button>
    
        {/* LISTA */}
        <div className='pt-3 pb-3'>

          <Table striped bordered hover responsive variant="light">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Tempo diário de trabalho</th>
                <th className='text-center'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                listDepartment.length === 0 ? 

                <tr className='text-center w-100'>
                  <td colSpan={4}>
                    <b>Não existe nenhum departamento no sistema.</b>
                  </td>
                </tr>
                :

                listDepartment?.map((item, index) => {
                  
                  return (
                    <tr key={index}>
                      <td> {item.name}</td>
                      <td> {item.description} </td>
                      <td className='text-center'> { utils.timePhrase(utils.secondsToTime(item.time_work))} </td>
                      <td className='text-center'>
                        <Button className='mx-2' variant='info' onClick={() => {getDepartment(item.id)}}>Editar</Button>
                        <Button className='mx-2' variant='danger' onClick={() => {deleteDepartment(item.id)}}>Excluir</Button>
                      </td>
                    </tr>
                  )
                })
              }
              
            </tbody>
          </Table>
        </div>

      </div>

      {/* MODAL */}
      <Modal show={show_modal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Novo departamento</Modal.Title>
        </Modal.Header>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>

            <Form.Label className='mb-0' >Nome*</Form.Label>
            <Form.Control size="sm" type="text" required defaultValue={department.name} onChange={(e) => setName(e) }/>
            <Form.Control.Feedback type="invalid">
              Insira um nome para este departamento.
            </Form.Control.Feedback>

            <Form.Label className='mt-2 mb-0'>Descrição*</Form.Label>
            <Form.Control as="textarea" rows={3} required defaultValue={department.description} onChange={(e) => setDescription(e)} />
            <Form.Control.Feedback type="invalid">
              Insira uma descrição para este departamento.
            </Form.Control.Feedback>

            <Form.Label className='mt-2 mb-0'>Tempo diário de trabalho*</Form.Label>
            <Row>
              <Col>
                <InputGroup className="mb-3" size='sm'>
                  <InputGroup.Text>Horas</InputGroup.Text>
                  <FormControl defaultValue={hour} type="number" min={1} max={23} maxLength={2} required onChange={(e) => handleHour(e)} />
                  <Form.Control.Feedback type="invalid">
                    Insira um valor entre 1 e 23.
                  </Form.Control.Feedback>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup className="mb-3" size='sm'>
                  <InputGroup.Text>Minutos</InputGroup.Text>
                  <FormControl defaultValue={minute} type="number" min={1} max={59} maxLength={2} required onChange={(e) => handleMinute(e)} />
                  <Form.Control.Feedback type="invalid">
                    Insira um valor entre 1 e 59.
                  </Form.Control.Feedback>
                </InputGroup>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" type="reset" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="dark" type='submit'>
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

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

export default Department;