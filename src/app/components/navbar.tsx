import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./themeProvider";

// Define Types for Navigation Items
interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "#Home", label: "Home" },
  { href: "#About", label: "About" },
  { href: "#Portfolio", label: "Portfolio" },
  { href: "#Contact", label: "Contact" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const { isDarkMode, toggleTheme } = useTheme();

  // Scroll Spy Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems
        .map((item) => {
          const section = document.querySelector(item.href) as HTMLElement | null;
          if (section) {
            return {
              id: item.href.replace("#", ""),
              offset: section.offsetTop - 550,
              height: section.offsetHeight,
            };
          }
          return null;
        })
        .filter(Boolean) as { id: string; offset: number; height: number }[];

      const currentPosition = window.scrollY;
      const active = sections.find(
        (section) =>
          currentPosition >= section.offset &&
          currentPosition < section.offset + section.height
      );

      if (active) {
        setActiveSection(active.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile Menu Effect
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // Scroll to Section Function
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const section = document.querySelector(href) as HTMLElement | null;
    if (section) {
      const top = section.offsetTop - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isOpen
          ? "bg-[#030014]/95 dark:bg-[#030014]/95"
          : scrolled
          ? "bg-white/50 dark:bg-[#030014]/50 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#Home"
              onClick={(e) => scrollToSection(e, "#Home")}
              className="text-3xl font-bold bg-gradient-to-r from-[#096929] to-[#09442c] bg-clip-text text-transparent"
            >
              Mathias
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="group relative px-1 py-2 text-sm font-medium"
              >
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    activeSection === item.href.substring(1)
                      ? "bg-gradient-to-r from-[#0aad69] to-[#55f7d4] bg-clip-text text-transparent font-semibold"
                      : "text-gray-700 dark:text-[#e2d3fd] group-hover:text-black dark:group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            ))}

            {/* Dark Mode Toggle - Desktop */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-[#1e1e1e] hover:bg-gray-200 dark:hover:bg-[#444] transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-gray-700 dark:text-[#e2d3fd]" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-[#e2d3fd]" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex items-center md:hidden">
            {/* Dark Mode Toggle - Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-lg bg-gray-100 dark:bg-[#1e1e1e] hover:bg-gray-200 dark:hover:bg-[#444] transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-gray-700 dark:text-[#e2d3fd]" />
              ) : (
                <Moon className="w-4 h-4 text-gray-700 dark:text-[#e2d3fd]" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative p-2 text-[#e2d3fd] hover:text-white transition-transform duration-300 ease-in-out transform ${
                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
              }`}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-[#030014] transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[-100%] pointer-events-none"
          }`}
          style={{ top: "64px" }}
        >
          <div className="flex flex-col h-[calc(100vh-64px)]">
            <div className="px-4 py-6 space-y-4 flex-1">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`block px-4 py-3 text-lg font-medium transition-all duration-300 ease ${
                    activeSection === item.href.substring(1)
                      ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                      : "text-[#e2d3fd] hover:text-white"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    transform: isOpen ? "translateX(0)" : "translateX(50px)",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;