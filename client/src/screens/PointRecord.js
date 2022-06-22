import React, { useState } from 'react';
import Header from '../components/Header';

const PointRecord = () => {

    const getNow = () => {
        let event = new Date();
        let now = event.toLocaleString('pt', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })
    }

    getNow();

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
        </div>

        <div> 
            { now }
        </div>
    </>
  );
}

export default PointRecord;