import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  );
}

export default App;
import CreateBusinessProfile from "./pages/CreateBusinessProfile";

<Route
  path="/create-business"
  element={<CreateBusinessProfile />}
/>

