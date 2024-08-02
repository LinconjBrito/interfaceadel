import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './pagestyleprocess.css';
import { FaTimes } from 'react-icons/fa';
import { RiAddLargeLine } from "react-icons/ri";
import { MdArrowForwardIos } from "react-icons/md";
import { CgBolt } from "react-icons/cg";

function ProcessosPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quantum } = location.state || { quantum: 0 };
  const { processos } = location.state || { processos: 0 };
  const { sobrecarga } = location.state || { sobrecarga: 0};

  const [processList, setProcessList] = useState(
    Array.from({ length: processos }, (_, index) => ({
      id: index + 1,
      tempoChegada: 0,
      tempoExecucao: 0,
      deadline: 0,
    }))
  );

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.processList) {
      setProcessList(location.state.processList);
    }
  }, [location.state]);

  const handleRemoveProcess = (index) => {
    setProcessList((prevProcesses) => prevProcesses.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updatedProcesses = processList.map((process, i) =>
      i === index ? { ...process, [field]: isNaN(value) || value === '' ? 0 : parseInt(value, 10) } : process
    );
    setProcessList(updatedProcesses);
  };

  const handleAddProcess = () => {
    const newProcess = {
      id: processList.length + 1,
      tempoChegada: 0,
      tempoExecucao: 0,
      deadline: 0,
    };
    setProcessList([...processList, newProcess]);
  };

  const handleEscalonarClick = () => {
    // Não é necessário definir updatedProcessList aqui; use processList diretamente
    navigate('/Amostragem', { state: { processList } });
  };

  const handleGenerateJson = () => {
    const qtd_processos = processList.length;


    const updatedProcessList = [...processList, { qtd_processos, quantum: parseInt(quantum, 10), sobrecarga: parseInt(sobrecarga, 10) }];
    setJsonData(JSON.stringify(updatedProcessList, null, 2));
  };

  const handleViewJson = () => {
    if (jsonData) {
      alert(jsonData);
    } else {
      alert("Primeiro, gere o JSON.");
    }
  };

  return (
    <div className='container-processo-body'>
      <div className='process-container'>
        {processList.map((process, index) => (
          <div key={index} className='process'>
            <h3>{index + 1}º Processo</h3>
            <div className='process-content'>
              <div>
                <label>Tempo de chegada:</label>
                <input
                  className='process-content'
                  type="number"
                  value={process.tempoChegada}
                  onChange={(e) => handleInputChange(index, 'tempoChegada', e.target.value)}
                  onFocus={(e) => e.target.select()}
                />
              </div>
              <div>
                <label>Tempo de execução:</label>
                <input
                  className='process-content'
                  type="number"
                  value={process.tempoExecucao}
                  onChange={(e) => handleInputChange(index, 'tempoExecucao', e.target.value)}
                  onFocus={(e) => e.target.select()}
                />
              </div>
              <div>
                <label>Deadline:</label>
                <input
                  className='process-content'
                  type="number"
                  value={process.deadline}
                  onChange={(e) => handleInputChange(index, 'deadline', e.target.value)}
                  onFocus={(e) => e.target.select()}
                />
              </div>
            </div>
            <button className='remove-button' onClick={() => handleRemoveProcess(index)}>
              <FaTimes />
            </button>
          </div>
        ))}

        <div className='add-process'>
          <h5>Novo Processo</h5>
          <button className="btn-process" onClick={handleAddProcess}><RiAddLargeLine size={40}></RiAddLargeLine></button>
        </div>
        <div className='fast-turnaround'>
          <h5>Faster ?</h5>
          <button ><CgBolt size={50} color="#FFC700"></CgBolt></button>
        </div>
      </div>
      <div className="div-btndone">
        <button className="btndone" onClick={handleEscalonarClick}>
          <span>Escalonar</span>
          <MdArrowForwardIos size={35} color="#fff" className="seta"></MdArrowForwardIos>
        </button>
      </div>
      <div className="json-actions">
        <button onClick={handleGenerateJson}>Gerar JSON</button>
        <button onClick={handleViewJson}>Ver JSON</button>
      </div>
    </div>
  );
}

export default ProcessosPage;
