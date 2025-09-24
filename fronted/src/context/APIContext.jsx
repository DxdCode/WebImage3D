import { createContext, useContext } from 'react';

const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const API_BASE = 'http://localhost:3000/api/images';
  return <APIContext.Provider value={{ API_BASE }}>{children}</APIContext.Provider>;
};

export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error('useAPI debe usarse dentro de un APIProvider');
  }
  return context;
};