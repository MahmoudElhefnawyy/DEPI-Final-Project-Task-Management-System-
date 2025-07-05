import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import service1 from '../assets/images/service-1.jpg';
import service2 from '../assets/images/service-2.jpg';
import service3 from '../assets/images/service-3.jpg';

const Services = () => {
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
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
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
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

  const services = [
    {
      title: "Communications",
      description: "Premium communication solutions tailored to your business needs. Our advanced systems ensure seamless connectivity across all platforms, with enterprise-grade security and 24/7 support. Streamline your organization's communication workflow with our cutting-edge technology.",
      linkText: "MORE",
      image: service1,
      path: "/communications"
    },
    {
      title: "Task Management",
      description: "Comprehensive task management system designed to boost productivity. Features include real-time collaboration, automated reminders, progress tracking, and integration with popular tools. Transform how your team organizes and completes work with our intuitive platform.",
      linkText: "MORE",
      image: service2,
      path: "/task-management"
    },
    {
      title: "Project Tracking",
      description: "End-to-end project tracking with powerful analytics and visualization tools. Monitor milestones, allocate resources efficiently, and generate detailed reports. Our system provides complete visibility across all projects with customizable dashboards.",
      linkText: "MORE",
      image: service3,
      path: "/project-tracking"
    }
  ];

  return (
    <>
      <Header />
      <div className="pb-5"></div>
      <motion.section 
        className="py-4" 
        style={{ backgroundColor: '#f8f9fa' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <Container>      
          <Row className="g-5 py-5 mb-3">
            {services.map((service, index) => (
              <Col lg={4} md={6} key={index} className="mb-4 mb-lg-0">
                <motion.div
                  variants={item}
                >
                  <motion.div
                    className="h-100"
                    variants={cardAnim}
                    whileHover="hover"
                  >
                    <Card 
                      className="h-100 border-0 bg-white shadow-sm overflow-hidden" 
                      style={{ 
                        borderRadius: '12px',
                        minHeight: '550px',
                      }}
                    >
                      <motion.div 
                        style={{ 
                          height: '280px', 
                          overflow: 'hidden',
                          padding: '0'
                        }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card.Img 
                          variant="top" 
                          src={service.image} 
                          style={{ 
                            objectFit: 'cover',
                            height: '100%',
                            width: '100%',
                          }} 
                        />
                      </motion.div>             
                      <Card.Body className="p-4 d-flex flex-column">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card.Title 
                            className="mb-3 text-center text-muted"
                            style={{ 
                              fontSize: '1.5rem',
                              letterSpacing: '0.5px'
                            }}
                          >
                            {service.title}
                          </Card.Title>
                        </motion.div>
                        
                        <Card.Text 
                          className="mb-4 text-muted"
                          style={{ 
                            lineHeight: '2',
                            flexGrow: 1
                          }}
                        >
                          {service.description}
                        </Card.Text> 
                        <div className="text-center"> 
                          <motion.button
                            style={{
                              backgroundColor: '#28a745',
                              border: 'none',
                              padding: '0.6rem 2rem',
                              borderRadius: '30px',
                              fontWeight: '600',
                              width: '100%',
                              margin: '0 auto',
                              color: 'white',
                              cursor: 'pointer'
                            }} 
                            onClick={() => navigate('/signUP')}
                            variants={buttonAnim}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            {service.linkText}
                          </motion.button>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </motion.section>
      <Footer />
    </>
  );
};

export default Services;