'use client'; // Only needed for Next.js apps, remove if using plain React

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code, Github, User } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

type TypewriterEffectProps = {
  text: string;
};

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const BackgroundEffect: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-purple-600/20 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-purple-600/10 blur-2xl animate-float" />
  </div>
);

type IconButtonProps = {
  Icon: React.FC<{ className?: string }>;
};

const IconButton: React.FC<IconButtonProps> = ({ Icon }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
    </div>
  </div>
);

type WelcomeScreenProps = {
  onLoadingComplete?: () => void;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#030014]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />
          <div className='relative min-h-screen flex items-center justify-center px-4'>
            <div className='w-full max-w-4xl mx-auto'>
              <motion.div className='flex justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8' variants={childVariants}>
                {[Code, User, Github].map((Icon, index) => (
                  <div key={index} data-aos='fade-down' data-aos-delay={index * 200}>
                    <IconButton Icon={Icon} />
                  </div>
                ))}
              </motion.div>
              
              <motion.div className='text-center mb-6 sm:mb-6 md:mb-12' variants={childVariants}>
                <h1 className="text-3xl text-gray-800 sm:text-4xl md:text-6xl font-bold space-y-2 sm:space-y-4">
                  {['Welcome', 'To', 'My'].map((word, index) => (
                    <span
                      key={index}
                      data-aos='fade-right'
                      data-aos-delay={200 + index * 200}
                      className='inline-block px-2 bg-gradient-to-r from-white via-blue-500 to-purple-200 bg-clip-text text-transparent'
                    >
                      {word}
                    </span>
                  ))}
                  <div>
                    {['Portfolio', 'Website'].map((word, index) => (
                      <span
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={800 + index * 200}
                        className="inline-block px-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </h1>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
