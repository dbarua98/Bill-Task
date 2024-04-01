import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import NavigationBar from "./Components/NavigationBar";
import Footer from "./Components/Footer";
import CreateBill from './Components/CreateBill';
import AddCustomer from './Components/AddCustomer';
import BillList from './Components/BillList';
import Home from './Components/Home';
function App() {
  return (
    <div>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/bill" element={<BillList />} />
            <Route path="/createbill" element={<CreateBill />} />
            <Route path="/createbill/:id" element={<CreateBill />} />
            <Route path="/addCustomer" element={<AddCustomer />} />
            <Route path="/addCustomer/:id" element={<AddCustomer/>} />
          </Routes>
          <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;