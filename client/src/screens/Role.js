import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios'
import { Table, Button, Modal, Form, ToastContainer, Toast } from 'react-bootstrap';
import utils from '../utils';

const Role = () => {

  const [show_modal, setShowModal] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [validated, setValidated] = useState(false);
  const [listRole, setListRole] = useState([]);
  const [role, setRole] = useState({
    id: null,
    name: "",
    description: "",
  });
  
  useEffect(() => {
    getListRole()
  }, [])

  const handleCloseModal = () => { 
    setShowModal(false)
    setValidated(false)

    role.id = null
    role.name = ""
    role.description = ""
    setRole(role)
  };

  const setName = (e) => {

    role.name = e.target.value
    setRole(role)

  }

  const setDescription = (e) => {

    role.description = e.target.value
    setRole(role)

  }

  const save = () => {
    
    let _method = "POST", _url = "http://localhost:8081/role/create"

    if (!utils.isEmptyOrNullOrUndefined(role.id)) {

      _method = "PUT";
      _url = "http://localhost:8081/role/update"

    }

    axios({
      method: _method,
      url: _url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: role
    }).then((response) => {

      if (response.data === "success") {

        setMessageToast("Cargo salvo com sucesso.")
        setShowToast(true)
        handleCloseModal()

      } else {

        setMessageToast("Houve uma falha ao salvar o cargo.")
        setShowToast(true)

      }

    }).catch((error) => {

      setMessageToast("Houve uma falha ao salvar o cargo.")
      setShowToast(true)
      console.log(error)

    }).finally(() => {

      getListRole()

    })
  }

  const getListRole = () => {

    axios({
      method: "GET",
      url: "http://localhost:8081/role/all",
    }).then((response) => {

      if (response.data)
        setListRole(response.data)

    }).catch((error) => {

      console.log(error)

    })
  }

  const getRole = (id) => {

    axios({
      method: "GET",
      url: "http://localhost:8081/role?id=" + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {

      if (response.data) {

        setRole(response.data)
        setShowModal(true)

      }

    }).catch((error) => {

      setMessageToast("Houve uma falha ao buscar os dados do cargo.")
      setShowToast(true)
      console.log(error)

    })

  }

  const deleteRole = (id) => {

    axios({
      method: "DELETE",
      url: "http://localhost:8081/role/delete?id=" + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {

      if (response.data === "success") {

        setMessageToast("Cargo deletado com sucesso.")
        setShowToast(true)

      } else {

        setMessageToast("Houve uma falha ao deletar o cargo.")
        setShowToast(true)

      }

    }).catch((error) => {

      setMessageToast("Houve uma falha ao deletar o cargo.")
      setShowToast(true)
      console.log(error)
      
    }).finally(() => {

      getListRole()

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

        <Button variant="primary" onClick={() => {setShowModal(true)}}>
          Novo cargo
        </Button>

        <Button className='mx-3' variant="primary" onClick={() => {getListRole()}}>
          Atualizar
        </Button>
    
        {/* LISTA */}
        <div className='pt-3 pb-3'>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th className='text-center'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                listRole.length === 0 ? 

                <tr className='text-center w-100'>
                  <td colSpan={4}>
                    <b>Não existe nenhum cargo no sistema.</b>
                  </td>
                </tr>
                :

                listRole?.map((item, index) => {
                  
                  return (
                    <tr key={index}>
                      <td> {item.name}</td>
                      <td> {item.description} </td>
                      <td className='text-center'>
                        <Button className='mx-2' variant='info' onClick={() => {getRole(item.id)}}>Editar</Button>
                        <Button className='mx-2' variant='danger' onClick={() => {deleteRole(item.id)}}>Excluir</Button>
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
          <Modal.Title>Novo cargo</Modal.Title>
        </Modal.Header>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>

            <Form.Label className='mb-0' >Nome*</Form.Label>
            <Form.Control size="sm" type="text" required defaultValue={role.name} onChange={(e) => setName(e) }/>
            <Form.Control.Feedback type="invalid">
              Insira um nome para este cargo.
            </Form.Control.Feedback>

            <Form.Label className='mt-2 mb-0'>Descrição*</Form.Label>
            <Form.Control as="textarea" rows={3} required defaultValue={role.description} onChange={(e) => setDescription(e)} />
            <Form.Control.Feedback type="invalid">
              Insira uma descrição para este cargo.
            </Form.Control.Feedback>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" type="reset" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type='submit'>
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

export default Role;