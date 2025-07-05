import React from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiSettings, FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import aboutImg from '../assets/images/about.png';
import TaskLeed from '../assets/images/TaskLeed.png';

const About = () => {
  const navigate = useNavigate();

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

  const imageAnim = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const featureItem = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      x: 5,
      transition: { duration: 0.2 }
    }
  };

  const buttonAnim = {
    hover: {
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(0,100,0,0.3)",
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.98
    }
  };

  const features = [
    {
      icon: <FiRefreshCw style={{ color: 'green', fontSize: '1.5rem' }} />,
      text: "Real-time task tracking and updates"
    },
    {
      icon: <FiSettings style={{ color: 'green', fontSize: '1.5rem' }} />,
      text: "Customizable workflows for different projects"
    },
    {
      icon: <FiUsers style={{ color: 'green', fontSize: '1.5rem' }} />,
      text: "Seamless team collaboration features"
    }
  ];

  return (
    <>
      <Header />
      <motion.div 
        className="container-fluid py-5"
        style={{ background: '#f8f9fa', minHeight: '80vh' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <div className="container py-5 mb-3">
          <div className="row align-items-center g-5">
            <motion.div 
              className="col-lg-6 order-lg-1 order-2 mb-5"
              variants={container}
            >
              <motion.div 
                className="feature-list mb-4"
                variants={container}
              >
                <motion.div 
                  className="d-flex align-items-center mb-5 my-5"
                  variants={item}
                  whileHover={{ scale: 1.02 }}
                >
                  <img 
                    src={TaskLeed} 
                    alt="TaskLeed" 
                    className="img-fluid" 
                    style={{ width: '150px', cursor: 'pointer' }} 
                  />
                </motion.div>

                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="d-flex align-items-start mb-4"
                    variants={featureItem}
                    whileHover="hover"
                  >
                    <div className="me-3">{feature.icon}</div>
                    <div className="text-muted fw-semibold">{feature.text}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button 
                className="btn btn-success px-4 py-0  fw-semibold mx-auto mt-4 fs-5 "
                // style={{ 
                //   borderRadius: '50px',
                //   fontSize: '.8rem',
                //   background: 'green',
                //   border: 'none',
                //   width: '230px',
                // }}
                onClick={() => navigate('/signUP')}
                variants={buttonAnim}
                whileHover="hover"
                whileTap="tap"
              >
                Explore Features
              </motion.button>
            </motion.div>

            <motion.div 
              className="col-lg-6 order-lg-2 order-1 mb-4 mb-lg-0"
              variants={imageAnim}
            >
              <motion.div 
                className="rounded-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={aboutImg} 
                  alt="Team collaborating on task management" 
                  className="img" 
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    objectFit: 'cover'
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default About;