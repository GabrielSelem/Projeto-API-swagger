import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Clientes from "./pages/Clientes";
import Produtos from "./pages/Produtos";

function App() {

  return (

      <BrowserRouter>

          <Routes>

              <Route
                  path="/"
                  element={<Login />}
              />

              <Route
                  path="/clientes"
                  element={<Clientes />}
              />

              <Route
                  path="/produtos"
                  element={<Produtos />}
              />

          </Routes>

      </BrowserRouter>
  );
}

export default App;