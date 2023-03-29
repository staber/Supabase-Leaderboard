import { BrowserRouter, Routes, Route } from "react-router-dom"

// pages
import Home from "./pages/Home"
import WristReps from "./pages/WristReps"
import Rebounder from "./pages/Rebounder"
import Update from "./pages/Update"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wristreps" element={<WristReps />} />
        <Route path="/rebounder" element={<Rebounder />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
