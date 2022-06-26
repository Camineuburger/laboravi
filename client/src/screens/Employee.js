import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios'
import { Table, Button, Modal, Form, ToastContainer, Toast } from 'react-bootstrap';
import utils from '../utils';

const Employee = () => {

  const [show_modal, setShowModal] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [validated, setValidated] = useState(false);
  const [listEmployee, setListEmployee] = useState([]);
  const [listRole, setListRole] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [employee, setEmployee] = useState({
    id: null,
    name: "",
    login: "",
    password: "",
    department: {},
    role: {},
    department_id: null,
    role_id: null,
  });
  
  useEffect(() => {
    getListEmployee()
    getListDepartment()
    getListRole()
  }, [])

  const handleCloseModal = () => { 
    setShowModal(false)
    setValidated(false)
    
    employee.id = null
    employee.name = ""
    employee.login = ""
    employee.department = {}
    employee.role = {}
    employee.department_id = null
    employee.role_id = null

    setEmployee(employee)
  };

  const setLogin = (e) => {

    employee.login = e.target.value
    setEmployee(employee)

  }

  const setName = (e) => {

    employee.name = e.target.value
    setEmployee(employee)

  }

  const setPassword = (e) => {

    employee.password = e.target.value
    setEmployee(employee)

  }

  const setDepartmentId = (e) => {

    employee.department_id = e.target.value
    setEmployee(employee)

  }

  const setRoleId = (e) => {

    employee.role_id = e.target.value
    setEmployee(employee)

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

  const save = () => {
    
    let _method = "POST", _url = "http://localhost:8081/users/create"

    if (!utils.isEmptyOrNullOrUndefined(employee.id)) {

      _method = "PUT";
      _url = "http://localhost:8081/users/update"

    }

    axios({
      method: _method,
      url: _url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: employee
    }).then((response) => {

      if (response.data === "success") {

        setMessageToast("Funcionário salvo com sucesso.")
        setShowToast(true)
        handleCloseModal()

      } else {

        setMessageToast("Houve uma falha ao salvar o funcionário.")
        setShowToast(true)

      }

    }).catch((error) => {

      setMessageToast("Houve uma falha ao salvar o funcionário.")
      setShowToast(true)
      console.log(error)

    }).finally(() => {

      getListEmployee()

    })
  }

  const getListEmployee = () => {

    axios({
      method: "GET",
      url: "http://localhost:8081/users/all",
    }).then((response) => {

      if (response.data)
        setListEmployee(response.data)

    }).catch((error) => {

      console.log(error)

    })
  }

  const getEmployee = (id) => {

    axios({
      method: "GET",
      url: "http://localhost:8081/users?id=" + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {

      if (response.data) {
        
        response.data.department_id = response.data.department.id
        response.data.role_id = response.data.role.id
        response.data.role_id = response.data.role.id
        setEmployee(response.data)

        setShowModal(true)

      }

    }).catch((error) => {

      setMessageToast("Houve uma falha ao buscar os dados do funcionário.")
      setShowToast(true)
      console.log(error)

    })

  }

  const deleteEmployee = (id) => {

    axios({
      method: "DELETE",
      url: "http://localhost:8081/users/delete?id=" + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {

      if (response.data === "success") {

        setMessageToast("Funcionário deletado com sucesso.")
        setShowToast(true)

      } else {

        setMessageToast("Houve uma falha ao deletar o funcionário.")
        setShowToast(true)

      }

    }).catch((error) => {

      setMessageToast("Houve uma falha ao deletar o funcionário.")
      setShowToast(true)
      console.log(error)
      
    }).finally(() => {

      getListEmployee()

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
          Novo funcionário
        </Button>

        <Button className='mx-3' variant="dark" onClick={() => {getListEmployee()}}>
          Atualizar
        </Button>
    
        {/* LISTA */}
        <div className='pt-3 pb-3'>

          <Table striped bordered hover responsive variant="light">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Departamento</th>
                <th>Cargo</th>
                <th className='text-center'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                listEmployee.length === 0 ? 

                <tr className='text-center w-100'>
                  <td colSpan={4}>
                    <b>Não existe nenhum cargo no sistema.</b>
                  </td>
                </tr>
                :

                listEmployee?.map((item, index) => {
                  
                  return (
                    <tr key={index}>
                      <td> {item.name}</td>
                      <td> {item.department.name} </td>
                      <td> {item.role.name} </td>
                      <td className='text-center'>
                        <Button className='mx-2' variant='info' onClick={() => {getEmployee(item.id)}}>Editar</Button>
                        <Button className='mx-2' variant='danger' onClick={() => {deleteEmployee(item.id)}}>Excluir</Button>
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
          <Modal.Title>Novo funcionário</Modal.Title>
        </Modal.Header>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>

            <Form.Label className='mb-0' >Nome*</Form.Label>
            <Form.Control size="sm" type="text" required defaultValue={employee.name} onChange={(e) => setName(e) }/>
            <Form.Control.Feedback type="invalid">
              Insira um nome para este funcionário.
            </Form.Control.Feedback>
            
            <Form.Label className='mt-3 mb-0' >Login*</Form.Label>
            <Form.Control size="sm" type="text" required defaultValue={employee.login} onChange={(e) => setLogin(e) }/>
            <Form.Control.Feedback type="invalid">
              Insira um nome para este funcionário.
            </Form.Control.Feedback>

            <Form.Label className='mt-3 mb-0' >Senha*</Form.Label>
            <Form.Control size="sm" type="password" required defaultValue={employee.password} onChange={(e) => setPassword(e) }/>
            <Form.Control.Feedback type="invalid">
              Insira uma senha para este funcionário.
            </Form.Control.Feedback>

            <Form.Label className='mt-3 mb-0' >Departamento*</Form.Label>
            <Form.Select aria-label="Default select example" size='sm' required onChange={(e) => { setDepartmentId(e)}} defaultValue={employee.department_id}>
              {
                listDepartment.map((item, index) => {

                  return (
                    <option key={index} value={item.id}>{item.name}</option>
                  )
                })
              }
            </Form.Select>

            <Form.Label className='mt-3 mb-0' >Cargo*</Form.Label>
            <Form.Select aria-label="Default select example" size='sm' required onChange={(e) => { setRoleId(e)}} defaultValue={employee.role_id}>
              {
                listRole.map((item, index) => {

                  return (
                    <option key={index} value={item.id}>{item.name}</option>
                  )
                })
              }
            </Form.Select>

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

export default Employee;