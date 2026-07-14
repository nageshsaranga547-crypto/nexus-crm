import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CrmProvider, useCrm } from './context/CrmContext';
import { Layout } from './components/layout';
import { Dashboard, Contacts, Deals, Tasks, Settings, Login } from './pages';

function ProtectedRoute({ children }) {
  const { state } = useCrm();
  return state.isAuthenticated ? children : <Navigate to="/nexus-crm/login" replace />;
}

function AppRoutes() {
  const { state } = useCrm();

  return (
    <Routes>
      <Route path="/nexus-crm/login" element={<Login />} />
      <Route
        path="/nexus-crm/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/nexus-crm/dashboard" replace />} />
        <Route path="nexus-crm/dashboard" element={<Dashboard />} />
        <Route path="nexus-crm/contacts" element={<Contacts />} />
        <Route path="nexus-crm/deals" element={<Deals />} />
        <Route path="nexus-crm/tasks" element={<Tasks />} />
        <Route path="nexus-crm/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter basename="/nexus-crm">
      <CrmProvider>
        <AppRoutes />
      </CrmProvider>
    </BrowserRouter>
  );
}

export default App;
