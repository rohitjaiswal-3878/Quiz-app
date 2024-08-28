import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Homepage from "./pages/Homepage";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import TakeTest from "./pages/TakeTest";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* default redirect to authentication page. */}
          <Route path="/" element={<Navigate to="/auth" />} />

          {/* Authentication route */}
          <Route element={<Authentication />} path="/auth" index />

          {/* Homepage routes */}
          <Route element={<Homepage />} path="/homepage/">
            <Route element={<Dashboard />} path="dashboard" />
            <Route element={<Analytics />} path="analytics" />
          </Route>

          {/* Test Route */}
          <Route path="/test/:id" element={<TakeTest />}></Route>

          {/* unknow redirect to error page. */}
          <Route path="*" element={<Navigate to="/error" />} />

          {/* 404 page not found */}
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
