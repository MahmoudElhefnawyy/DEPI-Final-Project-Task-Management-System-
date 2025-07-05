import { motion } from "framer-motion";
import { Link } from 'react-router-dom'; 
import task1 from '../assets/images/task1.png'; 

const Usage = () => {
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

    const buttonAnim = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: 0.4
            }
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.98
        }
    };

    return (
        <motion.section 
            className="bg-light py-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
        >
            <div className="container-fluid px-5 d-flex flex-column flex-md-row align-items-center justify-content-between gap-8">
                <motion.div 
                    className="col-md-6 mb-4 mb-md-0 mt-5"
                    variants={imageAnim}
                >
                    <img 
                        src={task1} 
                        alt="Task Management" 
                        className="img-fluid rounded" 
                        loading="lazy"
                    />
                </motion.div>

                <motion.div 
                    className="col-md-6"
                    variants={container}
                >
                    <motion.h2 
                        className="display-4 mb-4 text-muted" 
                        variants={item}
                    >
                        Track and Manage Your Tasks Effectively
                    </motion.h2>

                    <motion.h5 
                        className="mb-4 text-muted"
                        variants={item}
                    >
                        Stay on top of your tasks with our intuitive task management system. Get a clear overview of all your tasks, monitor progress in real-time, and ensure nothing falls through the cracks. Whether you're managing personal to-dos or team projects.
                    </motion.h5>

                    <motion.div 
                        className="mb-4 pb-5"
                        variants={container}
                    >
                        <motion.h5 
                            className="text-muted mb-3"
                            variants={item}
                        >
                            TaskLeed has got you covered. Sign up today and start managing your tasks more efficiently.
                        </motion.h5>

                        <motion.div variants={buttonAnim}>
                            <Link 
                                to="/SignUp" 
                                className="text-decoration-none text-success fw-bold fs-5 p-0 mr-5"
                            >
                                Register Now →
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Usage;