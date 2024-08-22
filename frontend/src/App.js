import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Homepage from "./pages/Homepage";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import TakeTest from "./pages/TakeTest";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Authentication />} path="/auth" />

          {/* Homepage routes */}
          <Route element={<Homepage />} path="/homepage/">
            <Route element={<Dashboard />} path="dashboard" />
            <Route element={<Analytics />} path="analytics" />
          </Route>

          <Route path="/test/:id" element={<TakeTest />}></Route>

          {/* default redirect to authentication page. */}
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
