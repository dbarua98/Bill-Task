import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import NavigationBar from "./Components/NavigationBar";
import { AuthProvider } from "./Components/AuthContext";
import ProfileHome from "./Components/ProfilesHome";
import ProfileCategory from "./Components/ProfileCategory"
import Footer from "./Components/Footer";
import CreateBill from './Components/CreateBill';
function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<ProfileHome />} />
            <Route path="/category" element={<ProfileCategory />} />
            <Route path="/createbill" element={<CreateBill />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;