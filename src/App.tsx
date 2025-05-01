import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/register";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        {/* Add other routes here */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
