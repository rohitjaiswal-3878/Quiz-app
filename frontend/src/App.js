import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Homepage from "./pages/Homepage";
import Analytics from "./pages/Analytics";
import CreateQuiz from "./pages/CreateQuiz";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Authentication />} path="/auth" />
          <Route element={<Homepage />} path="/homepage/">
            <Route element={<Dashboard />} path="dashboard" />
            <Route element={<Analytics />} path="analytics" />
            <Route element={<CreateQuiz />} path="create" />
          </Route>
          {/* default redirect to authentication page. */}
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
