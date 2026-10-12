import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import CreateBusiness from "./pages/CreateBusinessProfile";
import Dashboard from "./pages/Dashboard";
import Legal from "./pages/Legal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/welcome"
          element={<Welcome />}
        />

        <Route
          path="/create-business"
          element={<CreateBusiness />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/terms"
          element={<Legal type="terms" />}
        />

        <Route
          path="/privacy"
          element={<Legal type="privacy" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
