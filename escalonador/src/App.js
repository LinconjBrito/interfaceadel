// App.js
import './style.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ProcessosPage from './ProcessosPage';
import AmostragemPage from './AmostragemPage';

function App() {
  const navigate = useNavigate();

  const [processos, setProcesso] = useState('');
  const [quantum, setQuantum] = useState('');
  const [sobrecarga, setSobrecarga] = useState('');

  const handleIncrementoProcessos = () => {
    setProcesso((processos) => String(Number(processos) + 1));
  };

  const handleDecrementoProcessos = () => {
    setProcesso((processos) => {
      const novoValor = Number(processos) - 1;
      return novoValor >= 0 ? String(novoValor) : processos;
    });
  };

  const handleIncrementoQuantum = () => {
    setQuantum((quantum) => String(Number(quantum) + 1));
  };

  const handleDecrementoQuantum = () => {
    setQuantum((quantum) => {
      const novoValor = Number(quantum) - 1;
      return novoValor >= 0 ? String(novoValor) : quantum;
    });
  };

  const handleIncrementoSobrecarga = () => {
    setSobrecarga((sobrecarga) => String(Number(sobrecarga) + 1));
  };

  const handleDecrementoSobrecarga = () => {
    setSobrecarga((sobrecarga) => {
      const novoValor = Number(sobrecarga) - 1;
      return novoValor >= 0 ? String(novoValor) : sobrecarga;
    });
  };

  const handleChangeProcessos = (event) => {
    setProcesso(event.target.value);
  };
  const handleChangeQuantum = (event) => {
    setQuantum(event.target.value);
  };
  const handleChangeSobrecarga = (event) => {
    setSobrecarga(event.target.value);
  };

  const handleFeitoClick = () => {
    navigate('/processos', { state: { processos, quantum, sobrecarga } });
  };

  return (
    <div className='containerbody'>
      <div className="form-group">
        <h2>Informe a quantidade de <span data-tooltip='Definiçao de um processo'><u>Processos</u></span>:</h2>
        <div className='botao'>
          <button onClick={handleDecrementoProcessos} className='btr button-rm'>-</button>
          <input
            className='number-input'
            type="number"
            value={processos}
            onChange={handleChangeProcessos}
          />
          <button onClick={handleIncrementoProcessos} className='bta button-add'>+</button>
        </div>
      </div>

      <div className="form-group">
        <h2>Informe qual o <span data-tooltip='Quantidade de tempo que o processo poderá executar por vez.'><u>quantum</u></span> do Sistema:</h2>
        <div className='botao'>
          <button onClick={handleDecrementoQuantum} className='btr button-rm'>-</button>
          <input
            className='number-input'
            type="number"
            value={quantum}
            onChange={handleChangeQuantum}
          />
          <button onClick={handleIncrementoQuantum} className='bta button-add'>+</button>
        </div>
      </div>

      <div className="form-group">
        <h2>Informe qual é a <span data-tooltip='Quantidade de tempo adicionado ao processo na ação de load e save do mesmo.'><u>sobrecarga</u></span> do Sistema:</h2>
        <div className='botao'>
          <button onClick={handleDecrementoSobrecarga} className='btr button-rm'>-</button>
          <input
            className='number-input'
            type="number"
            value={sobrecarga}
            onChange={handleChangeSobrecarga}
          />
          <button onClick={handleIncrementoSobrecarga} className='bta button-add'>+</button>
        </div>
      </div>

      <div className='divbutton'>
        <button className='btn buttonsuccess' onClick={handleFeitoClick}>Feito</button>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/processos" element={<ProcessosPage />} />
        <Route path="/Amostragem" element={<AmostragemPage />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
