import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CrmProvider } from './context/CrmContext';
import { Layout } from './components/layout';
import { Dashboard, Contacts, Companies, Deals, Tasks, Calendar, Calls, Emails, Quotes, Reports, Settings, Login } from './pages';

function App() {
  return (
    <CrmProvider>
      <BrowserRouter basename="/nexus-crm">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="companies" element={<Companies />} />
            <Route path="deals" element={<Deals />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="calls" element={<Calls />} />
            <Route path="emails" element={<Emails />} />
            <Route path="quotes" element={<Quotes />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CrmProvider>
  );
}

export default App;
