import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Add other routes here */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
