import { createContext, useContext, useState } from 'react';

const CrmContext = createContext();

export function CrmProvider({ children }) {
  const [state, setState] = useState({
    isAuthenticated: true, // Auto-authenticated for demo
    user: {
      id: 1,
      name: 'John Doe',
      email: 'john@nexuscrm.com',
      role: 'Admin',
    },
    workspace: {
      id: 1,
      name: 'Nexus CRM',
    },
  });

  return (
    <CrmContext.Provider value={{ state, setState }}>
      {children}
    </CrmContext.Provider>
  );
}

export function useCrm() {
  const context = useContext(CrmContext);
  if (!context) {
    throw new Error('useCrm must be used within a CrmProvider');
  }
  return context;
}
