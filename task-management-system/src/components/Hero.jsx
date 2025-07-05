import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import "swiper/swiper-bundle.css";
import "../styles/Header.css";
import PaginationDots from "./PaginationDots";
import banner1 from "../assets/images/banner1.png";
import banner2 from "../assets/images/banner2.png";
import banner3 from "../assets/images/banner3.png";
import "../styles/Hero.css";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const slidesData = [
    {
      title: "Create and Manage Tasks while Collaborating with your Team",
      textColor: "#6c757d",
      image: banner2,
    },
    {
      title: "Task Management Improves Productivity and Teamwork",
      textColor: "#6c757d",
      image: banner1,
    },
    {
      title: "Real-Time Updates Seamless Communication and Task Tracking",
      textColor: "#6c757d",
      image: banner3,
    },
  ];

  const handleDotClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { y: 50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="hero-section">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        loop={true}
        className="swiper-container"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="slide-content"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div className="slide-text">
                <motion.h2 
                  style={{ color: slide.textColor }}
                  variants={itemVariants}
                >
                  {slide.title}
                </motion.h2>
                <motion.div variants={itemVariants}>
                  <Link to="/SignUp">
                    <button
                      className="btn px-4 mx-auto fs-5"
                      style={{
                        backgroundColor: "#43A046",
                        color: "white",
                        fontWeight: "500",
                      }}
                    >
                      Build Task
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div 
                className="slide-image"
                variants={imageVariants}
              >
                <img src={slide.image} alt={slide.title} />
              </motion.div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      <motion.div 
        className="pagination-dots"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <PaginationDots
          activeIndex={activeIndex}
          totalSlides={slidesData.length}
          onDotClick={handleDotClick}
        />
      </motion.div>
    </section>
  );
};

export default Hero;