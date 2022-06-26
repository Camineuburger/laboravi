import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Table, Button, Modal, Form, Toast, ToastContainer } from 'react-bootstrap';
import utils from '../utils';
import axios from 'axios'

const MainWorkTime = () => {

    const [ content, setContent ] = useState('main_work_time');
    const [ listWorkTimes, setListWorkTimes ] = useState([]);
    const [ hour, setHour ] = useState('');
    const [showModal, setShowModal ] = useState(false);
    const [messageToast, setMessageToast] = useState("");
    const [validated, setValidated] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [ dataJustifyWorkTime, setDataJustifyWorkTime ] = useState({
        id: null,
        description: '',
        point_at: new Date().toISOString(),
        user_id: '1'
    });

    useEffect(() => {
        getMainWorkTime();
    }, [])

    const getNow = () => {
        let event = new Date();
        let now = event.toLocaleString('pt', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
        
        return setHour(now);
    }

    setTimeout(() => {
        getNow();
    }, 1000);

    const save = () => {
    
        let _method = "POST", _url = "http://localhost:8081/historywork/create"
    
        if (!utils.isEmptyOrNullOrUndefined(dataJustifyWorkTime.id)) {
    
          _method = "PUT";
          _url = "http://localhost:8081/historywork/update/worklog"
    
        }

        dataJustifyWorkTime.user_id = "1"
        setDataJustifyWorkTime(dataJustifyWorkTime)

        axios({
          method: _method,
          url: _url,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          data: dataJustifyWorkTime
        }).then((response) => {

            if (response.data === "success") {
                setMessageToast("Ponto salvo com sucesso.")

                if (!utils.isEmptyOrNullOrUndefined(dataJustifyWorkTime.id))
                    setMessageToast("Ponto alterado com sucesso.")

                setShowToast(true)
                setShowModal(false)
            } else {
                setMessageToast("Houve uma falha ao salvar o ponto.")

                if (!utils.isEmptyOrNullOrUndefined(dataJustifyWorkTime.id))
                    setMessageToast("Houve falha ao alterar o ponto.")

                setShowToast(true)
            }
    
        }).catch((error) => {
    
          setMessageToast("Houve uma falha ao salvar o departamento.")
          setShowToast(true)
          console.log(error)
    
        }).finally(() => {
    
            getMainWorkTime();
    
        })
    }

    const handleSubmit = (event) => {

        const form = event.currentTarget;
    
        event.preventDefault();
    
        form.checkValidity() === false ? event.stopPropagation() : save()
        
        setValidated(true);
    
    };

    const getMainWorkTime = () => {
        axios({
            method: "GET",
            url: "http://localhost:8081/historywork/all",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        }).then((response) => {
            if (response.data) {
                let list = formatHour(response.data);
                setListWorkTimes(list);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const formatHour = (list) => {
        list.forEach((element, index) => {
            let date = new Date(element.point_at);
            date = date.toLocaleString('pt');
            date = date.split(" ");

            element.date = date[0];
            element.hour = date[1];
        });

        return list;
    }

    const setDescription = (e) => {
        dataJustifyWorkTime.description = e.target.value
        setDataJustifyWorkTime(dataJustifyWorkTime)
    }

    const setPointAt = (e) => {
        dataJustifyWorkTime.point_at = e.target.value
        setDataJustifyWorkTime(dataJustifyWorkTime)
    }

    const handleShowModal = (id) => {
        getWorkTime(id);
    }

    const handleHideModal = () => {

        setShowModal(false)
        dataJustifyWorkTime.description = ""
        dataJustifyWorkTime.id = null
        dataJustifyWorkTime.user_id = "1"
        setDataJustifyWorkTime(dataJustifyWorkTime)
    }

    const getWorkTime = (id) => {
        axios({
            method: "GET",
            url: `http://localhost:8081/historywork?id=${id}`,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        }).then((response) => {
            if (response.data) {
                // let list = formatHour(response.data);
                setDataJustifyWorkTime(response.data);
                setShowModal(true);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

  return (
    <>
        <div
            style={{
                height: '100%'
            }}
        >
            <Header />

            <main
                style={{
                    height: '100%'
                }}
            >
                <div
                    style={{
                        width: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        left: '8%',
                        right: '5%',
                        top: '15%',
                        background: 'cornflowerblue',
                        height: '80%',
                        borderRadius: '30px',
                        position: 'fixed',
                    }}
                >
                    <div
                        style={{
                            justifyContent: 'space-evenly',
                            display: 'flex',
                            marginTop: '15px',
                        }}          
                    >
                        <button
                            onClick={() => setContent("main_work_time")}
                            style={{
                                borderRadius: '10px',
                                width: '20%',
                                height: '40px',
                                background: 'beige',
                                border: 'none',
                                boxShadow: '#0000006e 3px 3px 3px',
                            }}
                        >
                            Marcar ponto
                        </button>

                        <button
                            onClick={() => setContent("history_point")}
                            style={{
                                borderRadius: '10px',
                                width: '20%',
                                height: '40px',
                                background: 'beige',
                                border: 'none',
                                boxShadow: '#0000006e 3px 3px 3px',
                            }}
                        >
                            Histórico de ponto
                        </button>
                    </div>
                    
                    { content === "main_work_time" &&
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    height: '25%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: '900',
                                    flexDirection: 'column',
                                }}      
                            >
                                <span>
                                    Seja bem vindo(a), 
                                </span>

                                <span
                                    style={{
                                        fontSize: '28pt',
                                    }}
                                >
                                    Eduardo Krutzsch!
                                </span>
                            </div>

                            <div
                                style={{
                                    alignSelf: 'center'
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '56pt'
                                    }}
                                >
                                    { hour }
                                </span>
                            </div>

                            <div
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '25%',
                                    display: 'flex',
                                    width: '100%',
                                }}
                            >
                                <button
                                    onClick={save}
                                    style={{
                                        borderRadius: '10px',
                                        width: '200px',
                                        height: '75px',
                                        background: 'beige',
                                        border: 'none',
                                        boxShadow: '#0000006e 3px 3px 3px',
                                    }}
                                >
                                    Registrar ponto
                                </button>
                            </div>
                        </>
                    }

                    { content === "history_point" &&
                        <>
                            <div
                                style={{
                                    overflowY: 'auto',
                                    marginTop: '20px',
                                    alignSelf: 'center',
                                    display: 'flex',
                                    width: '90%',
                                    height: '85%',
                                }}      
                            >
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Horário</th>
                                            <th>Data</th>
                                            <th>Descrição</th>
                                            <th>Ajustado</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { listWorkTimes?.map((item, index) => {
                                            return(
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.hour}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.is_pending ? "Sim" : "Não"}</td>
                                                    <td align='center'>
                                                        <Button onClick={() => handleShowModal(item.id)}>Ajustar ponto</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </>
                    }

                    <Modal show={showModal} onHide={() => handleHideModal()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Justificar ponto</Modal.Title>
                        </Modal.Header>

                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Form.Label className='mb-0'>Data e hora *</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="datetime-local"
                                    required
                                    defaultValue={dataJustifyWorkTime.point_at}
                                    onChange={(e) => setPointAt(e)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe data e hora
                                </Form.Control.Feedback>

                                <Form.Label className='mt-2 mb-0'>Descrição *</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    required
                                    defaultValue={dataJustifyWorkTime.description}
                                    onChange={(e) => setDescription(e)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe uma descrição para esta justificativa
                                </Form.Control.Feedback>

                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" type="reset" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </Button>
                                <Button variant="primary" type='submit'>
                                    Salvar
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>

                </div>
            </main>
            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Laboravi</strong>
                    <small className="text-muted">1 segundo atrás</small>
                </Toast.Header>
                <Toast.Body>{ messageToast }</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    </>
  );
}

export default MainWorkTime;