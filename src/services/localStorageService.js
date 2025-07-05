// src/services/localStorageService.js
const CLAVE = 'territorios_registros';

export const getDatosLocales = async () => {
  const datos = localStorage.getItem(CLAVE);
  return datos ? JSON.parse(datos) : [];
};

export const guardarDatosLocales = async (data) => {
  localStorage.setItem(CLAVE, JSON.stringify(data));
};
