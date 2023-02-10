import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import CompoundInt from "./components/CompoundInt";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <Routes> 
          <Route exact path="/" element={<Banner />}/>
          <Route exact path="/compoundint" element={<CompoundInt/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
