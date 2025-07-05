// src/components/RegistroTabla.jsx
import React, { useContext, useState } from 'react';
import { RegistroContext } from '../context/RegistroContext';

export default function RegistroTabla() {
  const { registros, agregarRegistro, eliminarRegistro, actualizarRegistro } = useContext(RegistroContext);

  const [encargado, setEncargado] = useState('');
  const [territorio, setTerritorio] = useState('1');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [observaciones, setObservaciones] = useState('');

  const handleEnviar = () => {
    agregarRegistro({
      id: Date.now(),
      encargado,
      territorio,
      fechaAsignacion: fecha,
      observaciones,
      fechaCompletado: null,
    });
    setEncargado('');
    setTerritorio('1');
    setFecha(new Date().toISOString().split('T')[0]);
    setObservaciones('');
  };

  return (
    <div className="registro-form">
      <h2>Registro de Asignación</h2>
      <label>Encargado:</label>
      <input value={encargado} onChange={e => setEncargado(e.target.value)} />

      <label>Territorio:</label>
      <select value={territorio} onChange={e => setTerritorio(e.target.value)}>
        {Array.from({ length: 34 }, (_, i) => (
          <option key={i + 1} value={i + 1}>{i + 1}</option>
        ))}
      </select>

      <label>Fecha de asignación:</label>
      <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />

      <label>Observaciones:</label>
      <textarea value={observaciones} onChange={e => setObservaciones(e.target.value)} />

      <button onClick={handleEnviar} className="btn verde">Enviar</button>

      <hr />
      <h3>Historial:</h3>
      <div className="historial-lista">
        {registros.map((r) => (
          <div key={r.id} className="card">
            <p><strong>Territorio:</strong> {r.territorio}</p>
            <p><strong>Encargado:</strong> {r.encargado}</p>
            <p><strong>Fecha:</strong> {r.fechaAsignacion}</p>
            <p><strong>Observaciones:</strong> {r.observaciones}</p>
            <p><strong>Completado:</strong> {r.fechaCompletado || 'Pendiente'}</p>
            <button onClick={() => eliminarRegistro(r.id)} className="btn rojo">🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
}
