import React from "react"; 
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import feature1 from '../assets/images/Feature-1.png';
import feature2 from '../assets/images/Feature-2.png';
import feature3 from '../assets/images/Feature-3.png';
import feature4 from '../assets/images/Feature-4.png';
import feature5 from '../assets/images/Feature-5.png';
import feature6 from '../assets/images/Feature-6.png';

function Features() {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardAnim = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3
      }
    }
  };

  const buttonAnim = {
    hover: {
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(40, 167, 69, 0.4)",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const features = [
    {
      icon: feature1,
      title: "Real-Time Dashboard",
      description: "Get instant visibility into all your team's tasks and projects with our live activity feed."
    },
    {
      icon: feature2,
      title: "Smart Task Assignment",
      description: "Automatically assign tasks to the right team members based on skills and availability."
    },
    {
      icon: feature3,
      title: "Custom Workflows",
      description: "Adapt the system to your team's unique processes with fully customizable stages."
    },
    {
      icon: feature4,
      title: "Progress Analytics",
      description: "Track completion rates and identify bottlenecks with detailed performance reports."
    },
    {
      icon: feature5,
      title: "Quick Setup",
      description: "Get started in minutes with intuitive tools that require no technical training."
    },
    {
      icon: feature6,
      title: "Team Collaboration",
      description: "Built-in chat and file sharing keeps all communication tied to specific tasks."
    }
  ];

  return (
    <>
      <Header />
      <motion.div 
        className="container-fluid py-5 bg-light"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <div className="container text-center py-4 mt-5 mb-3">
          <motion.div 
            className="row g-4"
            variants={container}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="col-md-4"
                variants={item}
              >
                <motion.div
                  className="bg-white p-4 h-100 rounded shadow-sm text-center"
                  variants={cardAnim}
                  whileHover="hover"
                >
                  <motion.img 
                    src={feature.icon} 
                    alt={feature.title} 
                    className="img-fluid mb-3" 
                    style={{height: "80px"}}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <h3 className="h4 mb-3 text-muted">{feature.title}</h3>
                  <p className="mb-0">
                    {feature.description.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          <motion.button 
            className="btn btn-success px-4 fw-semibold py-1 mt-5"
            onClick={() => navigate('/signUP')}
            variants={buttonAnim}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ 
              borderRadius: '50px',
              fontSize: '1rem',
              background: 'green',
              border: 'none',
              width: '230px',
            }}
          >
            Start Free Trial
          </motion.button>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}

export default Features;