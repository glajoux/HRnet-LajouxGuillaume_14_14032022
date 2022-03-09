import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeList from "./pages/EmployeeList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<CreateEmployee />} />
        <Route path="/liste" element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
