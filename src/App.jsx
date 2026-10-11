import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import CreateBusiness from "./pages/CreateBusinessProfile";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/create-business" element={<CreateBusiness />} />
      <Route path="/dashboard" element={<h1>Dashboard coming next</h1>} />
    </Routes>
  );
}

export default App;
