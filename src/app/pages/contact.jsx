/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from '../components/themeProvider';

const ContactPage = () => {
  const { isDarkMode } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false,
      });
    };

    initAOS();
    setIsLoaded(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Sending Message...',
      html: 'Please wait while we send your message',
      allowOutsideClick: false,
      background: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const form = e.target;
      const formData = new FormData(form);
      await form.submit();

      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        confirmButtonColor: '#3b82f6',
        background: isDarkMode ? '#1a1a1a' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000',
        timer: 2000,
        timerProgressBar: true
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#3b82f6',
        background: isDarkMode ? '#1a1a1a' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center transition-colors duration-700 bg-white dark:bg-black text-gray-900 dark:text-gray-100 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      id="Contact"
    >
      <div className="container mx-auto px-[5%] sm:px-6 lg:px-[10%] py-20">
        <div className="text-center mb-12">
          <h2
            data-aos="fade-down"
            data-aos-duration="1000"
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-500 dark:from-gray-100 dark:to-blue-300 bg-clip-text text-transparent"
          >
            Contact Me
          </h2>
          <p
            data-aos="fade-up"
            data-aos-duration="1100"
            className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base"
          >
            Got a question? Send me a message, and I'll get back to you soon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12">
          <div
            data-aos="fade-right"
            data-aos-duration="1200"
            className="bg-white/50 dark:bg-black/50 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-800/50 p-8 transition-all duration-300 hover:shadow-xl"
          >
            <div className=" justify-between grid place-items-center items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-blue-500 dark:from-gray-100 dark:to-blue-300 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Have something to discuss? Send me a message and let's talk.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-blue-600 dark:text-blue-400 opacity-50" />
            </div>

            <form 
              action="https://formsubmit.co/your-email@example.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-400/30 transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-400/30 disabled:opacity-50"
                  required
                />
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-400/30 transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-400/30 disabled:opacity-50"
                  required
                />
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full h-40 resize-none p-4 pl-12 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-400/30 transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-400/30 disabled:opacity-50"
                  required
                />
              </div>

              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gray-900 to-blue-500 dark:from-blue-400 dark:to-purple-400 text-white py-4 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default ContactPage;