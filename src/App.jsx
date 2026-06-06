import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import NotFoundPage from "./Pages/404";
import Footer from "./components/layout/Footer";
import SkillsChart from "./components/portfolio/SkillsChart";

/* Subtle gradient divider between sections */
const Divider = () => (
  <div className="relative mx-[5%] lg:mx-[10%]">
    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
  </div>
);

const LandingPage = () => (
  <>
    <Navbar />
    <AnimatedBackground />
    <main>
      <Home />
      <Divider />
      <About />
      <Divider />
      <SkillsChart />
      <Divider />
      <Portofolio />
      <Divider />
      <ContactPage />
    </main>
    <Footer />
  </>
);

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/"            element={<LandingPage />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
        <Route path="*"            element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
