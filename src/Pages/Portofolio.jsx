import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../supabase";

import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";


const ToggleButton = ({ onClick, isShowingMore }) => {
  return (
    <button
      onClick={onClick}
      className="
        px-3 py-1.5
        text-slate-300 
        hover:text-white 
        text-sm 
        font-medium 
        transition-all 
        duration-300 
        ease-in-out
        flex 
        items-center 
        gap-2
        bg-white/5 
        hover:bg-white/10
        rounded-md
        border 
        border-white/10
        hover:border-white/20
        backdrop-blur-sm
        group
        relative
        overflow-hidden
      "
    >
      <span className="relative z-10 flex items-center gap-2">
        {isShowingMore ? "See Less" : "See More"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`
            transition-transform 
            duration-300 
            ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
          `}
        >
          <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
        </svg>
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
    </button>
  );
};

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isShowingMore: PropTypes.bool.isRequired,
};


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// techStacks remain the same
const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
  { icon: "next.jpg", language: "NextJS" },
  { icon: "ts.png", language: "TypeScript" },
  { icon: "ant.jpg", language: "Ant Design" },
  { icon: "shadcn.png", language: "Shadcn UI" },
  { icon: "subabase.jpg", language: "Supabase" },
  { icon: "redux.png", language: "Redux" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;
  const THUMBS_PER_VIEW = 4;

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [thumbOffset, setThumbOffset] = useState(0);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);


  const fetchData = useCallback(async () => {
    try {
      // Fetch data from Supabase in parallel
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order('id', { ascending: false }),
        supabase.from("certificates").select("*").order('id', { ascending: true }), 
      ]);

      // Error handling for each request
      if (projectsResponse.error) throw projectsResponse.error;
      if (certificatesResponse.error) throw certificatesResponse.error;

      // Supabase returns data in the 'data' property
      const projectData = projectsResponse.data || [];
      const certificateData = certificatesResponse.data || [];

      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage (this functionality is maintained)
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  }, []);



  useEffect(() => {
    // Try to get from localStorage first for faster load
    const cachedProjects = localStorage.getItem('projects');
    const cachedCertificates = localStorage.getItem('certificates');

    if (cachedProjects && cachedCertificates) {
        setProjects(JSON.parse(cachedProjects));
        setCertificates(JSON.parse(cachedCertificates));
    }
    
    fetchData(); // Still call fetchData to sync latest data
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback(() => {
    setShowAllCertificates(prev => !prev);
  }, []);

  // Reset carousel position when projects load
  useEffect(() => {
    if (projects.length > 0) {
      setActiveProjectIndex(0);
      setThumbOffset(0);
    }
  }, [projects.length]);

  const goProjectNext = () =>
    setActiveProjectIndex(prev => (prev + 1) % projects.length);
  const goProjectPrev = () =>
    setActiveProjectIndex(prev => (prev - 1 + projects.length) % projects.length);
  const goThumbNext = () =>
    setThumbOffset(prev => Math.min(prev + 1, Math.max(0, projects.length - THUMBS_PER_VIEW)));
  const goThumbPrev = () =>
    setThumbOffset(prev => Math.max(0, prev - 1));

  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  // Rest of the component (return statement) has no changes
  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <div className="relative overflow-hidden w-full">
          <motion.div
            className="flex w-full"
            style={{
              width: "300%",
            }}
            animate={{
              x: `-${value * 33.333}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              const threshold = 50;
              if (info.offset.x > threshold && value > 0) {
                setValue(value - 1);
              } else if (info.offset.x < -threshold && value < 2) {
                setValue(value + 1);
              }
            }}
          >
            <div className="w-1/3 flex-shrink-0">
              <TabPanel value={value} index={0} dir={theme.direction}>
                {projects.length > 0 ? (
                  <div className="w-full">
                    {/* ── Featured Project Carousel ── */}
                    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/80">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeProjectIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col md:flex-row md:h-[400px]"
                        >
                          {/* Image */}
                          <div className="relative w-full md:w-[62%] h-[220px] md:h-full overflow-hidden flex-shrink-0">
                            <img
                              src={projects[activeProjectIndex]?.Img}
                              alt={projects[activeProjectIndex]?.Title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/70 hidden md:block" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent md:hidden" />
                          </div>

                          {/* Info Panel */}
                          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center gap-4 bg-slate-900/90 md:bg-transparent">
                            <span className="text-purple-400 text-xs font-mono tracking-[0.15em] uppercase">
                              PROJECT {String(activeProjectIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                            </span>
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                              {projects[activeProjectIndex]?.Title}
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                              {projects[activeProjectIndex]?.Description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 mt-1">
                              {projects[activeProjectIndex]?.Link ? (
                                <a
                                  href={projects[activeProjectIndex].Link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur text-white text-sm font-medium transition-all w-fit"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  Live Demo
                                </a>
                              ) : (
                                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 text-gray-500 text-sm w-fit">
                                  <ExternalLink className="w-4 h-4" />
                                  Demo N/A
                                </span>
                              )}
                              <Link
                                to={`/project/${projects[activeProjectIndex]?.id}`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-sm font-medium transition-all w-fit"
                              >
                                <ChevronRight className="w-4 h-4" />
                                Details
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Prev / Next arrows */}
                      <button
                        onClick={goProjectPrev}
                        className="absolute left-3 top-[110px] md:top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:scale-110"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={goProjectNext}
                        className="absolute right-3 top-[110px] md:top-1/2 md:right-auto md:left-[59%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:scale-110"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex justify-center gap-2 mt-4 flex-wrap">
                      {projects.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveProjectIndex(i)}
                          className={`rounded-full transition-all duration-300 ${
                            i === activeProjectIndex
                              ? "w-5 h-2 bg-purple-500"
                              : "w-2 h-2 bg-white/20 hover:bg-white/40"
                          }`}
                        />
                      ))}
                    </div>

                    {/* ── Thumbnail Row ── */}
                    <div className="mt-8">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {projects.slice(thumbOffset, thumbOffset + THUMBS_PER_VIEW).map((project, i) => {
                          const projIdx = thumbOffset + i;
                          const isActive = projIdx === activeProjectIndex;
                          return (
                            <div
                              key={project.id}
                              data-aos="fade-up"
                              data-aos-duration="800"
                              onClick={() => setActiveProjectIndex(projIdx)}
                              className={`cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 ${
                                isActive
                                  ? "border-purple-500 shadow-lg shadow-purple-500/20 scale-[1.02]"
                                  : "border-white/10 hover:border-white/30 hover:scale-[1.01]"
                              } bg-gradient-to-br from-slate-900 to-slate-800`}
                            >
                              <div className="relative aspect-video overflow-hidden">
                                <img
                                  src={project.Img}
                                  alt={project.Title}
                                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                  loading="lazy"
                                />
                                {isActive && (
                                  <div className="absolute inset-0 bg-purple-500/10" />
                                )}
                              </div>
                              <div className="p-3">
                                <p className="text-purple-400/70 text-[10px] font-mono tracking-[0.12em] uppercase truncate mb-1">
                                  {project.Title.replace(/\s+/g, "-").toUpperCase().slice(0, 28)}
                                </p>
                                <h4 className="text-white text-sm font-semibold truncate">{project.Title}</h4>
                                <p className="text-gray-500 text-xs line-clamp-2 mt-1">{project.Description}</p>
                                <Link
                                  to={`/project/${project.id}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="mt-2 inline-flex items-center gap-1 text-purple-400 text-xs hover:text-purple-300 transition-colors"
                                >
                                  <ChevronRight className="w-3 h-3" />
                                  Details
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Thumbnail pagination */}
                      {projects.length > THUMBS_PER_VIEW && (
                        <div className="flex items-center justify-center gap-4 mt-5">
                          <button
                            onClick={goThumbPrev}
                            disabled={thumbOffset === 0}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span className="text-gray-500 text-sm">
                            {thumbOffset + 1}–{Math.min(thumbOffset + THUMBS_PER_VIEW, projects.length)} / {projects.length}
                          </span>
                          <button
                            onClick={goThumbNext}
                            disabled={thumbOffset + THUMBS_PER_VIEW >= projects.length}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-20 text-gray-500 text-sm">
                    Loading projects...
                  </div>
                )}
              </TabPanel>
            </div>

            <div className="w-1/3 flex-shrink-0">
              <TabPanel value={value} index={1} dir={theme.direction}>
                <div className="container mx-auto flex justify-center items-center overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                    {displayedCertificates.map((certificate, index) => (
                      <div
                        key={certificate.id || index}
                        data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                        data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                      >
                        <Certificate ImgSertif={certificate.Img} />
                      </div>
                    ))}
                  </div>
                </div>
                {certificates.length > initialItems && (
                  <div className="mt-6 w-full flex justify-start">
                    <ToggleButton
                      onClick={toggleShowMore}
                      isShowingMore={showAllCertificates}
                    />
                  </div>
                )}
              </TabPanel>
            </div>

            <div className="w-1/3 flex-shrink-0">
              <TabPanel value={value} index={2} dir={theme.direction}>
                <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                    {techStacks.map((stack, index) => (
                      <div
                        key={index}
                        data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                        data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                      >
                        <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                      </div>
                    ))}
                  </div>
                </div>
              </TabPanel>
            </div>
          </motion.div>
        </div>
      </Box>
    </div>
  );
}