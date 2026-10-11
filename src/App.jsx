import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import CreateBusiness from "./pages/CreateBusiness";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/create-business" element={<CreateBusiness />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
