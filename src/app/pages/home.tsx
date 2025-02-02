/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useEffect, useState, useCallback, memo } from 'react';
import { Linkedin, Mail, ExternalLink, Instagram, Facebook } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from 'next/image';
import { useTheme } from '../components/themeProvider';

const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-gray-200/10 dark:border-white/10">
      </div>
    </div>
  </div>
));
StatusBadge.displayName = "StatusBadge";

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      {/* Social */}
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary blur-3xl opacity-30 dark:opacity-20"></span>
        <span className="relative bg-gradient-to-r from-gray-900 to-blue-500 dark:from-gray-100 dark:to-blue-300 bg-clip-text text-transparent">
          Social
        </span>
      </span>
      <br className="md:hidden" />
      <span className="hidden md:inline">&nbsp;</span>
      
      {/* Worker */}
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary blur-3xl opacity-30 dark:opacity-20"></span>
        <span className="relative bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-300 dark:to-purple-400 bg-clip-text text-transparent">
          Worker
        </span>
      </span>
    </h1>
  </div>
));
MainTitle.displayName = "MainTitle";


const TechStack = memo(({ tech }: { tech: string }) => (
  <div className="px-3 py-1.5 text-xs sm:text-sm sm:px-4 sm:py-2 rounded-full bg-gray-100/50 dark:bg-background/5 backdrop-blur-sm border border-gray-200/50 dark:border-foreground/10 text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-background/10 transition-colors">
    {tech}
  </div>
));
TechStack.displayName = "TechStack";

interface CTAButtonProps {
  href: string;
  text: string;
  icon: React.ElementType;
}

const CTAButton = memo(({ href, text, icon: Icon }: CTAButtonProps) => {
  return (
    <a href={href} className="block">
      <button className="group relative w-[140px] sm:w-[160px]">
        {/* Glowing Background */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-600 rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
        
        {/* Button Background */}
        <div className="relative h-10 sm:h-11 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-lg border border-gray-300/50 dark:border-gray-700/50 leading-none overflow-hidden">
          {/* Hover Effect */}
          <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-gray-100/20 to-gray-300/20 dark:from-gray-700/20 dark:to-gray-800/20"></div>
          
          {/* Text & Icon */}
          <span className="absolute inset-0 flex items-center justify-center gap-2 text-xs sm:text-sm group-hover:gap-3 transition-all duration-300">
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent font-medium z-10">
              {text}
            </span>
            <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700 dark:text-white ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
          </span>
        </div>
      </button>
    </a>
  );
});
CTAButton.displayName = "CTAButton";

interface SocialLinkProps {
  icon: React.ElementType;
  link: string;
}


const SocialLink = memo(({ icon: Icon, link }: SocialLinkProps) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-2 sm:p-3">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 dark:from-indigo-500 dark:to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      
      {/* Button Wrapper */}
      <div className="relative rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-1.5 sm:p-2 flex items-center justify-center border border-gray-300/50 dark:border-gray-700 group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-all duration-300">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));
SocialLink.displayName = "SocialLink";

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Hi am Matius williams a Social worker Student"];
const TECH_STACK = ["React", "Javascript", "Node.js", "Tailwind"];
const SOCIAL_LINKS = [
  { icon: Facebook, link: "https://www.facebook.com/evanchimwaza/"},
  { icon: Linkedin, link: "https://www.linkedin.com/in/Matias Williams/" },
  { icon: FaWhatsapp, link: "https://wa.me/+265885783996" },
  { icon: Instagram, link: "https://www.instagram.com/MatiusWilliams/" }
];

const HomePage = () => {
  const { isDarkMode } = useTheme();
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 100,
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timer = setInterval(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
    return () => clearInterval(timer);
  }, [handleTyping, isTyping]);

  
  return (
    <div className="min-h-screen transition-colors duration-700 bg-white dark:bg-black text-gray-900 dark:text-gray-100" id="Home">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen lg:justify-between gap-6 sm:gap-8 lg:gap-20 py-16 lg:py-0">
            
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1 px-4 sm:px-0" 
                 data-aos="fade-right" 
                 data-aos-delay="200">
              <div className="space-y-3 sm:space-y-4">
                <StatusBadge />
                <MainTitle />
                
                {/* Typing Effect */}
                <div className="h-12 sm:h-8 flex items-center justify-center lg:justify-start overflow-hidden" 
                     data-aos="fade-up" 
                     data-aos-delay="800">
                  <span className="text-base xs:text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[2px] sm:w-[3px] h-4 sm:h-6 bg-gradient-to-t from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-300 ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p className="text-sm xs:text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed font-light mx-auto lg:mx-0 px-4 sm:px-0" 
                   data-aos="fade-up" 
                   data-aos-delay="1000">
                  Transforming ideas into meaningful support and positive change through social work.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start px-2 sm:px-0" 
                     data-aos="fade-up" 
                     data-aos-delay="1200">
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start" 
                     data-aos="fade-up" 
                     data-aos-delay="1400">
                  <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links */}
                <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start p-2 sm:p-3" 
                     data-aos="fade-up" 
                     data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/2 h-[250px] xs:h-[300px] sm:h-[400px] lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-1 lg:order-2 px-4 sm:px-0" 
                 onMouseEnter={() => setIsHovering(true)}
                 onMouseLeave={() => setIsHovering(false)}
                 data-aos="fade-left"
                 data-aos-delay="600">
              <div className="relative w-full max-w-[300px] xs:max-w-[350px] sm:max-w-[400px] lg:max-w-none opacity-90">
                {/* Background Blur Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r from-gray-200/10 to-gray-400/10 dark:from-gray-900/10 dark:to-gray-700/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                  isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                }`}></div>

                {/* Profile Image */}
                <div className={`relative z-10 w-full opacity-90 transform transition-transform duration-500 ${
                  isHovering ? "scale-105" : "scale-100"
                }`}>
                  <Image
                    src="/mg3.jpg"
                    alt="Your Name or Description"
                    width={599}
                    height={400}
                    className="rounded-3xl object-cover w-full h-[250px] xs:h-[300px] sm:h-[400px] lg:h-[600px]"
                    priority
                  />
                </div>

                {/* Floating Glow Effect */}
                <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                  isHovering ? "opacity-50" : "opacity-20"
                }`}>
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[300px] xs:max-w-[350px] sm:max-w-[400px] aspect-square bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-indigo-600/10 dark:to-purple-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                    isHovering ? "scale-110" : "scale-100"
                  }`}></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage