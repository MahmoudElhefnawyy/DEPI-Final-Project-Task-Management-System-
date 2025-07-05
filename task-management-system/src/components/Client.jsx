import { motion } from "framer-motion";
import client1 from "../assets/images/client1.png";
import client2 from "../assets/images/client2.png";
import client3 from "../assets/images/client3.png";
import client4 from "../assets/images/client4.png";
import client5 from "../assets/images/client5.png";
import client6 from "../assets/images/client6.png";

const Client = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const logoItem = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section 
      className="py-5 bg-light"
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
          Our Clients
        </motion.h2>
        <motion.h5 
          className="text-center mb-5 text-muted"
          variants={item}
        >
          We have been working with some Fortune 500+ clients.
        </motion.h5>
        
        <motion.div 
          className="row justify-content-center cursor-pointer"
          variants={container}
        >
          {[client1, client2, client3, client4, client5, client6].map((client, index) => (
            <motion.div 
              key={index}
              className="col-md-2 text-center"
              variants={logoItem}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={client}
                alt="Our Client Image Logo"
                className="img-fluid mb-3"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Client;