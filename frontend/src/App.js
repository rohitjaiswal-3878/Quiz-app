import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/Authentication";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Authentication />} path="/auth" />

          {/* default redirect to authentication page. */}
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
