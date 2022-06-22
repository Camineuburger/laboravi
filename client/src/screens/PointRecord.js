import React, { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios'

const PointRecord = () => {

    const getNow = () => {
        let event = new Date();
        let now = event.toLocaleString('pt', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })

        return now
    }

    //TODO: Criar as services e inserir as request no mesmo.
    // TESTE!!
    // TESTE!!
    // TESTE!!
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
            console.log(response);
            // alert("Sucesso o ponto foi batido.")
        }).catch((error) => {
            console.log(error);
        })

    }
    // TESTE!!
    // TESTE!!
    // TESTE!!


    setInterval(() => {
        getNow();
    }, 1000);

  return (
    <>
        <Header/>
        <div>
            <span>
                Seja bem vindo(a) Camille Menezes Neuburger!!!
            </span>
            <button className='btn btn-sm btn-danger' onClick={logWorkTime} > REGISTRAR PONTO</button>
        </div>

        <div> 
            { getNow() }
        </div>
    </>
  );
}

export default PointRecord;