import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CrmProvider, useCrm } from './context/CrmContext';
import { Layout } from './components/layout';
import { Dashboard, Contacts, Deals, Tasks, Settings, Login } from './pages';

function ProtectedRoute({ children }) {
  const { state } = useCrm();
  return state.isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { state } = useCrm();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="deals" element={<Deals />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <CrmProvider>
      <BrowserRouter basename="/nexus-crm">
        <AppRoutes />
      </BrowserRouter>
    </CrmProvider>
  );
}

export default App;
