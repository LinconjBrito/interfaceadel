// AmostragemPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './pagestyleamostragem.css';

function AmostragemPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { processList } = location.state;

  const [speed, setSpeed] = useState(1); // Estado para armazenar o valor da velocidade
  const [visibleColumns, setVisibleColumns] = useState(0); // Estado para controlar o número de colunas visíveis

  const totalItems = processList.length * 5;
  const columns = 5;
  const rows = Math.ceil(totalItems / columns);

  const gridItems = Array.from({ length: totalItems }, (_, index) => (
    <div key={index} className="grid-item">
      {index + 1}
    </div>
  ));

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
    setVisibleColumns(0); // Reinicia a renderização do grid
  };

  useEffect(() => {
    let timer;
    if (visibleColumns < columns) {
      timer = setTimeout(() => {
        setVisibleColumns((prev) => prev + 1);
      }, 1000 / speed);
    }
    return () => clearTimeout(timer);
  }, [visibleColumns, speed, columns]);

  const getGridItemsByColumn = () => {
    const items = [];
    for (let col = 0; col < visibleColumns; col++) {
      for (let row = 0; row < rows; row++) {
        const index = row * columns + col;
        if (index < totalItems) {
          items.push(gridItems[index]);
        }
      }
    }
    return items;
  };

  const handleBackClick = () => {
    navigate('/Processos', { state: { processList } });
  };

  return (
    <div className="section-btns">
      <div className="button-container">
        <div className="divbtn-fifo">
          <button className="btn-fifo"><h3>FIFO</h3></button>
        </div>
        <div className="divbtn-sjf">
          <button className="btn-sjf"><h3>SJF</h3></button>
        </div>
        <div className="divbtn-rr">
          <button className="btn-rr"><h3>RR</h3></button>
        </div>
        <div className="divbtn-edf">
          <button className="btn-edf"><h3>EDF</h3></button>
        </div>
      </div>

      <div className="speed-container">
        <label htmlFor="speed">Velocidade:</label>
        <input
          id="speed"
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={handleSpeedChange}
        />
        <span>{speed}</span>
      </div>

      <div className="grid-container">
        {getGridItemsByColumn()}
      </div>
      <button onClick={handleBackClick}>Voltar</button>
    </div>
  );
}

export default AmostragemPage;
