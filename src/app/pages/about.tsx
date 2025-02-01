'use client';

import React, { useEffect, memo, useMemo, useState } from "react";
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles, UserCheck } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from "next/image";
import { useTheme } from '../components/themeProvider';


interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  value: number;
  label: string;
  description: string;
  animation: string;
}

const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2 
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-500 dark:from-gray-100 dark:to-blue-300 bg-clip-text text-transparent"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p 
      className="mt-2 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      Transforming ideas into meaningful support and positive change through social work.
      <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  
  return (
    <div 
      className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div 
        className="relative group" 
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className={`absolute -inset-6 opacity-[25%] z-0 hidden sm:block transition-all duration-700 ${
          isHovering ? 'opacity-40' : 'opacity-20'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 dark:from-blue-600/30 dark:to-purple-500/30 rounded-full blur-2xl animate-spin-slower" />
          <div className="absolute inset-0 bg-gradient-to-l from-gray-500/30 to-blue-500/30 dark:from-gray-400/30 dark:to-blue-400/30 rounded-full blur-2xl animate-pulse-slow opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 to-blue-400/30 dark:from-purple-600/30 dark:to-blue-500/30 rounded-full blur-2xl animate-float opacity-50" />
        </div>

        <div className="relative">
          <div className={`w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-lg transition-all duration-700 ${
            isHovering ? 'scale-105 shadow-blue-500/20 dark:shadow-blue-400/20' : ''
          }`}>
            <div className={`absolute inset-0 border-4 border-gray-200/20 dark:border-white/20 rounded-full z-20 transition-all duration-700 ${
              isHovering ? 'border-blue-300/40 dark:border-blue-400/40 scale-105' : ''
            }`} />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-purple-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />
            
            <img
              src="/evan.png"
              alt="Profile"
              style={{ width: "600px", height: "500px" }}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isHovering ? 'scale-110 rotate-2' : ''
              }`}
              loading="lazy"
            />

            <div className={`absolute inset-0 transition-all duration-700 z-20 hidden sm:block ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
              <div className="absolute inset-0 rounded-full border-8 border-gray-200/10 dark:border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const StatCard: React.FC<StatCardProps> = memo(({ icon: Icon, color, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="relative z-10 bg-white/50 dark:bg-black/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-100/50 dark:bg-gray-900/50 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-gray-800 dark:text-gray-200" />
        </div>
        <span 
          className="text-4xl font-bold text-gray-900 dark:text-gray-100"
          data-aos="fade-up-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
        >
          {value}
        </span>
      </div>

      <div>
        <p 
          className="text-sm uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-anchor-placement="top-bottom"
        >
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p 
            className="text-xs text-gray-600 dark:text-gray-400"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          >
            {description}
          </p>
          <ArrowUpRight className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  const { isDarkMode } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
  const storedProjects: string[] = JSON.parse(localStorage.getItem("projects") || "[]");
  const storedCertificates: string[] = JSON.parse(localStorage.getItem("certificates") || "[]");
    
    const startDate = new Date("2021-11-06");
    const today = new Date();
    const experience = today.getFullYear() - startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience
    };
  }, []);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false, 
      });
    };

    initAOS();
    setIsLoaded(true);
    
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const statsData = useMemo(() => [
    {
      icon: Code,
      color: "from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400",
      value: totalProjects,
      label: "Total Projects",
      description: "Innovative web solutions crafted",
      animation: "fade-right",
    },
    {
      icon: Award,
      color: "from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400",
      value: totalCertificates,
      label: "Certificates",
      description: "Professional skills validated",
      animation: "fade-up",
    },
    {
      icon: Globe,
      color: "from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400",
      value: YearExperience,
      label: "Years of Experience",
      description: "Continuous learning journey",
      animation: "fade-left",
    },
  ], [totalProjects, totalCertificates, YearExperience]);

  return (
    <div
      className={`min-h-screen transition-colors duration-700 bg-white dark:bg-black text-gray-900 dark:text-gray-100 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      id="About"
    >
      <div className="container mx-auto px-[5%] sm:px-6 lg:px-[10%] py-20">
        <Header />

        <div className="w-full mx-auto pt-8 sm:pt-12 relative">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <span className="bg-gradient-to-r from-gray-900 to-blue-500 dark:from-gray-100 dark:to-blue-300 bg-clip-text text-transparent">
                  Hi, I'm
                </span>
                <span 
                  className="block mt-2 text-gray-800 dark:text-gray-200"
                  data-aos="fade-right"
                  data-aos-duration="1300"
                >
                  Matius Williams
                </span>
              </h2>
              
              <p 
                className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-justify pb-4 sm:pb-0"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                I am a passionate social worker dedicated to helping individuals and
                 communities improve their well-being. With experience in advocacy,
                  counseling, and community support,
                 I work to create positive change and empower those in need.
              </p>

              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
                <a href="/cv.pdf" className="w-full lg:w-auto">
                  <button 
                    data-aos="fade-up"
                    data-aos-duration="800"
                    className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-gray-900 to-blue-500 dark:from-blue-400 dark:to-purple-400 text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl"
                  >
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                  </button>
                </a>
                <a href="#Projects" className="w-full lg:w-auto">
                  <button 
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-blue-500/50 dark:border-blue-400/50 text-blue-600 dark:text-blue-400 font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-blue-500/10"
                  >
                    <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                  </button>
                </a>
              </div>
            </div>

            <ProfileImage />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slower {
          to { transform: rotate(360deg); }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);