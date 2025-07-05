// src/components/MapaArcGIS.jsx
import React, { useContext, useState } from 'react';
import { RegistroContext } from '../context/RegistroContext';

export default function MapaArcGIS() {
  const { registros, actualizarRegistro } = useContext(RegistroContext);
  const pendientes = registros.filter(r => !r.fechaCompletado);

  const [cambios, setCambios] = useState({}); // { id: { observaciones, fechaCompletado } }

  const handleInputChange = (id, campo, valor) => {
    setCambios(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [campo]: valor
      }
    }));
  };

  const handleGuardar = (reg) => {
    const actualizado = {
      ...reg,
      ...cambios[reg.id],
      fechaCompletado: cambios[reg.id]?.fechaCompletado || null,
      observaciones: cambios[reg.id]?.observaciones || reg.observaciones || ''
    };
    actualizarRegistro(actualizado);
    setCambios(prev => {
      const nuevo = { ...prev };
      delete nuevo[reg.id];
      return nuevo;
    });
  };

  return (
    <div className="mapa-container">
      <h2>Territorios pendientes</h2>

      <div className="map-wrapper">
        <iframe
          title="Mapa ArcGIS"
          width="100%"
          height="300"
          style={{ border: '1px solid #ccc', borderRadius: 6 }}
          src="https://www.arcgis.com/apps/instant/basic/index.html?appid=26140e40a84f48afa9c16cba4d15330f"
          allowFullScreen
        />
      </div>

      <div className="lista-pendientes">
        {pendientes.length === 0 ? (
          <p>No hay territorios pendientes.</p>
        ) : (
          pendientes.map((reg) => (
            <div key={reg.id} className="card">
              <p><strong>Territorio:</strong> {reg.territorio}</p>
              <p><strong>Encargado:</strong> {reg.encargado}</p>
              <p><strong>Fecha asignación:</strong> {reg.fechaAsignacion}</p>

              <label>Observaciones:</label>
              <textarea
                value={cambios[reg.id]?.observaciones ?? reg.observaciones ?? ''}
                onChange={(e) => handleInputChange(reg.id, 'observaciones', e.target.value)}
              />

              <label>Fecha completado:</label>
              <input
                type="date"
                value={cambios[reg.id]?.fechaCompletado ?? ''}
                onChange={(e) => handleInputChange(reg.id, 'fechaCompletado', e.target.value)}
              />

              <button className="btn verde" onClick={() => handleGuardar(reg)}>✅ Enviar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
