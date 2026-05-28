import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Pendientes from "./pages/Pendientes";
import CalculoDiasHabiles from "./pages/CalculoDiasHabiles";
import Estados from "./pages/Estados";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pendientes" element={<Pendientes />} />
        <Route path="/calculo-dias" element={<CalculoDiasHabiles />} />
        <Route path="/estados" element={<Estados />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;