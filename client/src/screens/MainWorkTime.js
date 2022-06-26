import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Table } from 'react-bootstrap';
import axios from 'axios'

const MainWorkTime = () => {

    const [ content, setContent ] = useState('main_work_time');
    const [ listWorkTimes, setListWorkTimes ] = useState([]);
    const [ dataJustifyWorkTime, setDataJustifyWorkTime ] = useState({});
    const [ hour, setHour ] = useState('');

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

    const logWorkTime = () => {
        const data = {
            user_id: "1",
            description: "Teste de ponto.",
        }

        axios({
            method: "POST",
            url: "http://localhost:8081/historywork/create",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            data: data
        }).then((response) => {
            if (response.data == "success")
                getMainWorkTime();
        }).catch((error) => {
            console.log(error);
        })

    }

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

    // const handleChange = (e, input) => {
    //     console.log(e.target.value);
    //     console.log(input);
    // }

    const justifyWorkingTime = () => {
        const data = {
            user_id: "1",
            description: "Teste de ponto.",
        }

        axios({
            method: "POST",
            url: "http://localhost:8081/historywork/update",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            data: data
        }).then((response) => {
            if (response.data == "success")
                getMainWorkTime();
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

                        <button
                            onClick={() => setContent("justify")}
                            style={{
                                borderRadius: '10px',
                                width: '20%',
                                height: '40px',
                                background: 'beige',
                                border: 'none',
                                boxShadow: '#0000006e 3px 3px 3px',
                            }}
                        >
                            Justificar
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
                                    onClick={logWorkTime}
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
                            <div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Horário</th>
                                            <th>Data</th>
                                            <th>Tipo de ponto</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { listWorkTimes?.map((item, index) => {
                                            return(
                                                <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td>{item.hour}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.description}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </>
                    }

                    { content === "justify" &&
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    height: '25%',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    color: 'white',
                                    flexDirection: 'column',
                                    marginLeft: '20px'
                                }}      
                            >
                                <span>
                                   Justifique aqui caso houve um problema com o seu ponto
                                </span>
                                {/* TODO: <>Imagem com info e nesse info colocar o que podem ser os problemas</> */}
                            </div>

                            <div
                                style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}      
                            >
                                <label>Data e hora</label>
                                <input type={'datetime-local'} onChange={(e) => handleChange(e, "point_at")}/>
                            </div>

                            <div
                                style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}      
                            >
                                <label>Justificativa</label>
                                <textarea onChange={(e) => handleChange(e, "description")}/>
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
                                    // onClick={justifyWorkingTime}
                                    style={{
                                        borderRadius: '10px',
                                        width: '200px',
                                        height: '40px',
                                        background: 'beige',
                                        border: 'none',
                                        boxShadow: '#0000006e 3px 3px 3px',
                                    }}                            
                                >
                                    Justificar
                                </button>
                            </div>
                        </>
                    }
                </div>
            </main>
        </div>
    </>
  );
}

export default MainWorkTime;