import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import CreateBusiness from "./pages/CreateBusinessProfile";
import Dashboard from "./pages/Dashboard";
import Legal from "./pages/Legal";
import About from "./pages/About";
import Pricing from "./pages/Pricing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/create-business" element={<CreateBusiness />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/terms" element={<Legal />} />
      <Route path="/privacy" element={<Legal />} />
      <Route path="/about" element={<About />} />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  );
}

export default App;
