import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import CreateBusiness from "./pages/CreateBusinessProfile";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Legal from "./pages/Legal";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Checkout from "./pages/Checkout";
import Done from "./pages/Done";
import CaptainNigeria from "./components/CaptainNigeria";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/create-business" element={<CreateBusiness />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/library" element={<Library />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/checkout/:planId" element={<Checkout />} />
        <Route path="/done" element={<Done />} />
        <Route path="/terms" element={<Legal />} />
        <Route path="/privacy" element={<Legal />} />
      </Routes>

      <CaptainNigeria />
    </>
  );
}

export default App;
