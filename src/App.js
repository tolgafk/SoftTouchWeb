import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Map from "./components/Map";


import Login from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";

function App() {
  return (
    <Routes>
      {/* Ana Site */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Hero />
            <Services />
            <Gallery />
            <About />
            <Contact />
            <Map />   
            <Footer />
          </>
        }
      />

      {/* Admin Panel */}
      <Route path="/admin" element={<Login />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
