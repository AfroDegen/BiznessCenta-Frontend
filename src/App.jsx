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

function App() {
return (
<Route path="/" element={} />
<Route path="/welcome" element={} />
<Route path="/create-business" element={} />
<Route path="/dashboard" element={} />
<Route path="/library" element={} />
<Route path="/profile" element={} />
<Route path="/about" element={} />
<Route path="/pricing" element={} />
<Route path="/terms" element={} />
<Route path="/privacy" element={} />
);
}

export default App;