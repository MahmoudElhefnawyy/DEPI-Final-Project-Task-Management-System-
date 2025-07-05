import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Contact.css';

const Contact = () => {
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const apiKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const formItem = {
    hidden: { x: 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonAnim = {
    hover: {
      scale: 1.02,
      boxShadow: "0 5px 15px rgba(40, 167, 69, 0.4)",
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.98
    }
  };

  const contactInfoAnim = {
    hover: {
      x: 5,
      transition: { duration: 0.2 }
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!serviceID || !templateID || !apiKey) {
      console.error('EmailJS environment variables not configured');
      setIsSubmitting(false);
      await Swal.fire({
        title: 'Configuration Error',
        text: 'Email service is not properly configured.',
        icon: 'error',
        showClass: {
          popup: 'animate__animated animate__headShake'
        }
      });
      return;
    }

    const formData = new FormData(form.current);
    const email = formData.get('user_email');
    
    if (!validateEmail(email)) {
      setIsSubmitting(false);
      await Swal.fire({
        title: 'Invalid Email',
        text: 'Please enter a valid email address',
        icon: 'warning',
        showClass: {
          popup: 'animate__animated animate__headShake'
        }
      });
      return;
    }

    Swal.fire({
      title: 'Processing Your Message...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      background: '#f8f9fa',
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      }
    });

    try {
      const result = await emailjs.sendForm(
        serviceID,
        templateID,
        form.current,
        apiKey
      );
      
      Swal.close();
      await Swal.fire({
        title: 'Message Sent!',
        text: 'We have received your message and will get back to you soon.',
        icon: 'success',
        confirmButtonText: 'Great!',
        confirmButtonColor: '#28a745',
        timer: 3000,
        timerProgressBar: true,
        background: '#f8f9fa',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      form.current.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      Swal.close();
      await Swal.fire({
        title: 'Oops...',
        text: error.text || 'Something went wrong! Please try again later.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#dc3545',
        background: '#f8f9fa',
        showClass: {
          popup: 'animate__animated animate__headShake'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <i className="bi bi-telephone icon"></i>,
      title: "Call Us",
      content: "+(02) 38 415 878"
    },
    {
      icon: <i className="bi bi-envelope icon"></i>,
      title: "Email Us",
      content: "support@TaskLeed.com"
    },
    {
      icon: <i className="bi bi-geo-alt icon"></i>,
      title: "Visit Us",
      content: "Task Management HQ, 7510 Innovation Tower, San Francisco, USA"
    },
    {
      icon: <i className="bi bi-clock icon"></i>,
      title: "Working Hours",
      content: "Monday - Friday: 9:00 AM - 6:00 PM (PST)"
    }
  ];

  return (
    <>
      <Header />
      <motion.div 
        className="contact-container bg-light"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <div className="container m-auto">
          <div className="row">
            <motion.div 
              className="col-md-6 mt-4"
              variants={container}
            >
              <div className="p-5">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="contact-info mb-4"
                    variants={item}
                    whileHover="hover"
                  >
                    <motion.div 
                      className="d-flex align-items-start"
                      variants={contactInfoAnim}
                    >
                      <div className="me-3">{info.icon}</div>
                      <div className="pb-4">
                        <h5 className='text-muted'>{info.title}</h5>
                        <p>{info.content}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="col-md-6 pt-3"
              variants={container}
            >
              <motion.div 
                className="p-4 my-3"
                variants={formItem}
              >
                <form ref={form} onSubmit={sendEmail}>
                  <motion.div className="mb-3" variants={formItem}>
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      name="user_name" 
                      placeholder="Enter your name" 
                      required 
                      minLength="2"
                    />
                  </motion.div>
                  <motion.div className="mb-3" variants={formItem}>
                    <label htmlFor="email" className="form-label">Your Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="user_email" 
                      placeholder="Enter your email" 
                      required 
                    />
                  </motion.div>
                  <motion.div className="mb-5" variants={formItem}>
                    <label htmlFor="message" className="form-label mb-2">Your Message</label>
                    <textarea 
                      className="form-control" 
                      id="message" 
                      name="message" 
                      rows="5" 
                      placeholder="How can we assist you with your task management needs?" 
                      required
                      minLength="10"
                    ></textarea>
                  </motion.div>
                  <motion.button 
                    type="submit" 
                    className="btn btn-success w-100 m-auto py-2"
                    disabled={isSubmitting}
                    variants={buttonAnim}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send-fill me-2"></i> Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <Footer/>
    </>
  );
};

export default Contact;