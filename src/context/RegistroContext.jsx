// src/context/RegistroContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import { getDatosLocales, guardarDatosLocales } from '../services/localStorageService';

export const RegistroContext = createContext();

export const RegistroProvider = ({ children }) => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const datos = await getDatosLocales();
      setRegistros(datos);
    };
    cargarDatos();
  }, []);

  const agregarRegistro = async (nuevo) => {
    const nuevos = [...registros, nuevo];
    setRegistros(nuevos);
    await guardarDatosLocales(nuevos);
  };

  const eliminarRegistro = async (id) => {
    const nuevos = registros.filter(r => r.id !== id);
    setRegistros(nuevos);
    await guardarDatosLocales(nuevos);
  };

  const actualizarRegistro = async (actualizado) => {
    const nuevos = registros.map(r => r.id === actualizado.id ? actualizado : r);
    setRegistros(nuevos);
    await guardarDatosLocales(nuevos);
  };

  return (
    <RegistroContext.Provider value={{ registros, agregarRegistro, eliminarRegistro, actualizarRegistro }}>
      {children}
    </RegistroContext.Provider>
  );
};
