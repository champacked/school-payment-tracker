import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SchoolTransactions from './pages/SchoolTransactions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="school-transactions" element={<SchoolTransactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;