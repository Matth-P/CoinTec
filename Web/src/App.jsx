import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login/LoginPage.jsx';
import Registro from './Pages/Register/RegisterPage.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Progress from './Pages/Progress/progress.jsx';
import WalletPage from './Pages/Wallet/WalletPage.jsx';
import Renda from './Pages/Renda/RendaPage.jsx';
import Perfil from './Pages/Perfil/Perfil.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

// Layout compartilhado que inclui a Navbar
const SharedLayout = ({ children }) => {
  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh' }}> {/* Fundo preto */}
      <Navbar /> {/* Navbar fixa no topo */}
      <main style={{ paddingTop: '60px' }}>{children}</main> {/* Conteúdo da página com padding para não ficar sob a navbar */}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Páginas sem Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Páginas com Navbar */}
        <Route
          path="/dashboard"
          element={
            <SharedLayout>
              <Dashboard />
            </SharedLayout>
          }
        />
        <Route
          path="/progresso"
          element={
            <SharedLayout>
              <Progress />
            </SharedLayout>
          }
        />
        <Route
          path="/carteira"
          element={
            <SharedLayout>
              <WalletPage />
            </SharedLayout>
          }
        />
        <Route
          path="/perfil"
          element={
            <SharedLayout>
              <Perfil />
            </SharedLayout>
          }
        />
        <Route
          path="/renda"
          element={
            <SharedLayout>
              <Renda />
            </SharedLayout>
          }
        />

        {/* Redirecionamentos */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;