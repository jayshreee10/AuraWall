import { Routes, Route } from "react-router-dom";
import Menubar from "./Components/Menubar";
import Home from "./Sections/Home";
import Photos from "./Sections/Photos";
import Videos from "./Sections/Videos";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routes

// Layout component with Menubar and Outlet for nested routes
function LayoutWithMenu() {
  return (
    <div>
      <Menubar />
      <Outlet /> {/* This is where Photos or Videos will render */}
    </div>
  );
}

function App() {
  return (
    <section className="flex bg-slate-100">
      <Routes>
        {/* Home route without Menubar */}
        <Route path="/" element={<Home />} />

        {/* Routes that share Menubar */}
        <Route element={<LayoutWithMenu />}>
          <Route path="/photos" element={<Photos />} />
          <Route path="/videos" element={<Videos />} />
        </Route>
      </Routes>
    </section>
  );
}

export default App;
