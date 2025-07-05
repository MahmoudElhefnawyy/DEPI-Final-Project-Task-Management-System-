import { motion } from "framer-motion";
import icon1 from '../assets/images/icon1.png';
import icon2 from '../assets/images/icon2.png';
import icon3 from '../assets/images/icon3.png';

const Community = () => {
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

  const cardAnim = {
    hidden: { y: 50, opacity: 0 },
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
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const cardsData = [
    {
      icon: icon1,
      title: "Membership Organisations",
      description: "Streamline your team's workflow by automating task assignments, tracking progress, and ensuring timely project completion."
    },
    {
      icon: icon2,
      title: "National Associations",
      description: "Enhance collaboration across departments with real-time updates, shared workspaces, and seamless communication tools."
    },
    {
      icon: icon3,
      title: "Clubs And Groups",
      description: "Organize events, assign responsibilities, and monitor deadlines with our intuitive task management features."
    }
  ];

  return (
    <motion.section 
      className="py-2 bg-light"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      <div className="container">
        <motion.h2 
          className="text-center mb-4 text-success"
          variants={item}
        >
          Explore Community
        </motion.h2>
        <motion.h5 
          className="text-center mb-5 text-muted"
          variants={item}
        >
          Choose the right plan for your team and get started with TaskLeed.
        </motion.h5>
        
        <motion.div 
          className="row d-flex justify-content-around gap-4"
          variants={container}
        >
          {cardsData.map((card, index) => (
            <motion.div 
              key={index}
              className="col-lg-4 col-md-4"
              variants={item}
            >
              <motion.div 
                className="card h-90 border-0 shadow-sm"
                style={{ minHeight: '250px' }}
                variants={cardAnim}
                whileHover="hover"
              >
                <div className="card-body text-center p-4 cursor-pointer">
                  <motion.div 
                    className="icon-container mb-3"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={card.icon} alt={card.title} />
                  </motion.div>
                  <h4 className="card-title mb-3 text-muted">{card.title}</h4>
                  <h6 className="card-text text-muted">
                    {card.description}
                  </h6>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Community;