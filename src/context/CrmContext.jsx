import { createContext, useContext, useReducer, useEffect } from 'react';
import { contacts as initialContacts, deals as initialDeals, tasks as initialTasks, activities as initialActivities, workspace, users } from '../data/mockData';

const CrmContext = createContext();

const initialState = {
  contacts: initialContacts,
  deals: initialDeals,
  tasks: initialTasks,
  activities: initialActivities,
  workspace,
  users,
  currentUser: users[0],
  isAuthenticated: true,
};

function crmReducer(state, action) {
  switch (action.type) {
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, { ...action.payload, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] }] };
    case 'UPDATE_CONTACT':
      return { ...state, contacts: state.contacts.map(c => c.id === action.payload.id ? action.payload : c) };
    case 'DELETE_CONTACT':
      return { ...state, contacts: state.contacts.filter(c => c.id !== action.payload) };
    
    case 'ADD_DEAL':
      return { ...state, deals: [...state.deals, { ...action.payload, id: Date.now() }] };
    case 'UPDATE_DEAL':
      return { ...state, deals: state.deals.map(d => d.id === action.payload.id ? action.payload : d) };
    case 'DELETE_DEAL':
      return { ...state, deals: state.deals.filter(d => d.id !== action.payload) };
    case 'MOVE_DEAL':
      return { ...state, deals: state.deals.map(d => d.id === action.payload.id ? { ...d, stage: action.payload.stage } : d) };
    
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, { ...action.payload, id: Date.now() }] };
    case 'UPDATE_TASK':
      return { ...state, tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t) };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    case 'TOGGLE_TASK':
      return { ...state, tasks: state.tasks.map(t => t.id === action.payload ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t) };
    
    case 'LOGIN':
      return { ...state, isAuthenticated: true, currentUser: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, currentUser: null };
    
    default:
      return state;
  }
}

export function CrmProvider({ children }) {
  const [state, dispatch] = useReducer(crmReducer, initialState);

  return (
    <CrmContext.Provider value={{ state, dispatch }}>
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

export function useContacts() {
  const { state, dispatch } = useCrm();
  return {
    contacts: state.contacts,
    addContact: (contact) => dispatch({ type: 'ADD_CONTACT', payload: contact }),
    updateContact: (contact) => dispatch({ type: 'UPDATE_CONTACT', payload: contact }),
    deleteContact: (id) => dispatch({ type: 'DELETE_CONTACT', payload: id }),
  };
}

export function useDeals() {
  const { state, dispatch } = useCrm();
  return {
    deals: state.deals,
    addDeal: (deal) => dispatch({ type: 'ADD_DEAL', payload: deal }),
    updateDeal: (deal) => dispatch({ type: 'UPDATE_DEAL', payload: deal }),
    deleteDeal: (id) => dispatch({ type: 'DELETE_DEAL', payload: id }),
    moveDeal: (id, stage) => dispatch({ type: 'MOVE_DEAL', payload: { id, stage } }),
  };
}

export function useTasks() {
  const { state, dispatch } = useCrm();
  return {
    tasks: state.tasks,
    addTask: (task) => dispatch({ type: 'ADD_TASK', payload: task }),
    updateTask: (task) => dispatch({ type: 'UPDATE_TASK', payload: task }),
    deleteTask: (id) => dispatch({ type: 'DELETE_TASK', payload: id }),
    toggleTask: (id) => dispatch({ type: 'TOGGLE_TASK', payload: id }),
  };
}
