import { motion } from "framer-motion";
import { Link } from 'react-router-dom'; 
import market1 from '../assets/images/market1.png'; 
import market2 from '../assets/images/market2.png';
import market3 from '../assets/images/market3.png';

const Marketing = () => {
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
      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3
      }
    }
  };

  const cardsData = [
    {
      image: market2,
      title: "Creating Streamlined Safeguarding Processes with OneRen",
      text: "What are your safeguarding responsibilities and how can you manage?",
      link: "Read more →"
    },
    {
      image: market1,
      title: "Revamping the Membership Model with Triathlon Australia",
      text: "Learn how Triathlon Australia transformed their membership model.",
      link: "Read more →"
    },
    {
      image: market3,
      title: "Boosting Engagement with Innovative Strategies",
      text: "Discover new ways to engage your community and increase participation.",
      link: "Read more →"
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
      <div className="container-fluid my-5 px-5">
        <motion.div 
          className="row mb-5"
          variants={container}
        >
          <div className="col text-center">
            <motion.h2 
              className="text-success mb-2"
              variants={item}
            >
              Market For Management
            </motion.h2>
            <motion.h5 
              className="mt-4 text-muted"
              variants={item}
            >
              The Nexcent blog is the best place to read about the latest membership.
            </motion.h5>
          </div>
        </motion.div>

        <motion.div 
          className="row g-6"
          variants={container}
        >
          {cardsData.map((card, index) => (
            <motion.div 
              key={index}
              className="col-md-4"
              variants={item}
            >
              <motion.div 
                className="card h-100 border-0 shadow-sm"
                variants={cardAnim}
                whileHover="hover"
              >
                <motion.img 
                  src={card.image} 
                  className="card-img-top" 
                  alt={card.title}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  loading="lazy"
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold text-muted">{card.title}</h5>
                  <p className="card-text text-muted">{card.text}</p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      to="/Features" 
                      className="btn btn-link text-decoration-none text-success fw-bold bg-light"
                    >
                      {card.link}
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Marketing;


