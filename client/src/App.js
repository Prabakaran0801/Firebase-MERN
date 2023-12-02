import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./pages/Table";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
// import Sidebar from "./components/Sidebar";
import "./styles/from.css";
function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        {/* <div className="navbar">
          <Sidebar />
        </div> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Create />} />
          <Route path="/table" element={<Table />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
