import { motion } from "framer-motion";
import analysis1 from '../assets/images/analysis1.png'; 
import analysis2 from '../assets/images/analysis2.png'; 
import analysis3 from '../assets/images/analysis3.png'; 
import analysis4 from '../assets/images/analysis4.png'; 
import businessImage from '../assets/images/Task2.png'; 

const BusinessSection = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const statItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  const statsData = [
    { icon: analysis1, value: "2,245,341", label: "Members" },
    { icon: analysis2, value: "828,867", label: "Event Bookings" },
    { icon: analysis3, value: "46,328", label: "Clubs" },
    { icon: analysis4, value: "1,926,436", label: "Payments" }
  ];

  return (
    <motion.section 
      className="bg-light py-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      <div className="container-fluid px-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-8">
          <motion.div 
            className="col-md-6 mt-5"
            variants={imageAnim}
          >
            <img 
              src={businessImage} 
              alt="Business Reinvent" 
              className="img-fluid rounded"
            />
          </motion.div>

          <motion.div 
            className="col-md-6 my-2"
            variants={container}
          >
            <motion.h2 
              className="display-4 text-muted mb-5 pb-5"
              variants={item}
            >
              Helping Create Projects and Tasks Development Faster
            </motion.h2>

            <motion.div 
              className="row"
              variants={container}
            >
              {statsData.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="col-md-6 mb-4 mb-5"
                  variants={statItem}
                  whileHover="hover"
                >
                  <div className="d-flex align-items-center gap-3">
                    <motion.img 
                      src={stat.icon} 
                      alt={stat.label} 
                      className="img-fluid" 
                      style={{ width: '40px' }}
                      whileHover={{ scale: 1.1 }}
                      loading="lazy"
                    />
                    <div>
                      <h3 className="fw-bold text-muted" style={{ fontSize: '1rem' }}>
                        {stat.value}
                      </h3>
                      <p className="text-muted" style={{ fontSize: '1rem' }}>
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default BusinessSection;