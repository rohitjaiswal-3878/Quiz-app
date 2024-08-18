import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Authentication />} path="/auth" />
          <Route element={<Dashboard />} path="/dashboard" />

          {/* default redirect to authentication page. */}
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
