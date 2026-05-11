import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import Vendas from "./pages/Vendas";
import Analytics from "./pages/Analytics";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";

export default function App() {

  // ✅ TOKEN
  const token =
    localStorage.getItem("token");

  // ✅ LOGIN
  function handleLogin(token, usuario) {

    if (!token || !usuario) {
      return;
    }

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "usuario",
      JSON.stringify(usuario)
    );

    window.location.href =
      "/dashboard";
  }

  // ✅ LOGOUT
  function handleLogout() {

    localStorage.removeItem("token");

    localStorage.removeItem("usuario");

    window.location.href = "/";
  }

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={
            <Login
              onLogin={handleLogin}
            />
          }
        />

        {/* CADASTRO */}
        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            token
              ? (
                <Dashboard
                  onLogout={handleLogout}
                />
              )
              : (
                <Navigate to="/" />
              )
          }
        />

        {/* USUÁRIOS */}
        <Route
          path="/usuarios"
          element={
            token
              ? <Usuarios />
              : <Navigate to="/" />
          }
        />

        {/* VENDAS */}
        <Route
          path="/vendas"
          element={
            token
              ? <Vendas />
              : <Navigate to="/" />
          }
        />

        {/* ANALYTICS */}
        <Route
          path="/analytics"
          element={
            token
              ? <Analytics />
              : <Navigate to="/" />
          }
        />

        {/* CALENDÁRIO */}
        <Route
          path="/calendar"
          element={
            token
              ? <Calendar />
              : <Navigate to="/" />
          }
        />

        {/* PERFIL */}
        <Route
          path="/profile"
          element={
            token
              ? <Profile />
              : <Navigate to="/" />
          }
        />

      </Routes>

    </BrowserRouter>

  );
}
