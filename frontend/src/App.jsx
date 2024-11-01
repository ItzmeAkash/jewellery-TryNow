import React from "react";
import Header from "./components/Header/Header";
import Bestsellers from "./pages/Bestsellers";
import CategoryBar from "./components/categoryBar/categoryBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
    
<BrowserRouter>


    <div>
      <Header />
      <Routes>
        <Route path="/bestsellers" element={<Bestsellers />} />

      </Routes>
    </div>
</BrowserRouter>
    </>
  );
};

export default App;
