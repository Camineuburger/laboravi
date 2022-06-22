import React, { useState } from 'react';

const HistoryPoints = () => {
  const [count, setCount] = useState(0);

  return (
    <div
        style={{
            height: '100%',
            width: '100%'
        }}
    >
        <div
            style={{
                background: 'green',
                borderRadius: '30px'
            }}
        >
            teste
        </div>
    </div>
  );
}

export default HistoryPoints;