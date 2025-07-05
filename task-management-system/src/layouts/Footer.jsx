import { useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import logo from '../assets/images/logo.png';
import TaskLeed from '../assets/images/TaskLeed.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const form = useRef();

    const sendEmail = async (e) => {
        e.preventDefault();
        
        Swal.fire({
            title: 'Procces Your Subscribtion...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const result = await emailjs.sendForm(
                'service_27jw17b',
                'template_565ty9v',
                form.current,
                'fWvEc-rhO1E9bWPYN'
            );
            
            Swal.close();
            await Swal.fire({
                title: 'Subscribed!',
                text: 'Thank you for subscribing to our updates.',
                icon: 'success',
                confirmButtonText: 'Great!',
                confirmButtonColor: '#28a745',
                timer: 3000,
                timerProgressBar: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            
            form.current.reset();
        } catch (error) {
            Swal.close();
            await Swal.fire({
                title: 'Oops...',
                text: 'Something went wrong! Please try again later.',
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#dc3545',
                showClass: {
                    popup: 'animate__animated animate__headShake'
                }
            });
            console.error('EmailJS error:', error);
        }
    };

    return (
        <footer className="bg-dark text-white pt-5 pb-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4"> 
                        <div className="d-flex align-items-start py-2">
                            <img src={logo} alt="logo" className="img-fluid" style={{ width: '60px', padding: '10px' }} />
                            <img src={TaskLeed} alt="TaskLeed" className="img-fluid" style={{ width: '120px', cursor: 'pointer' }} />
                        </div>
                        <p>Copyright © 2025 TaskLeed.<br />All rights reserved</p>
                        <div className="mt-4">
                            <Link to="#" className="text-decoration-none text-white me-3">
                                <FontAwesomeIcon icon={faFacebook} size="lg" />
                            </Link>
                            <Link to="#" className="text-decoration-none text-white me-3">
                                <FontAwesomeIcon icon={faTwitter} size="lg" />
                            </Link>
                            <Link to="#" className="text-decoration-none text-white me-3">
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </Link>
                            <Link to="#" className="text-decoration-none text-white">
                                <FontAwesomeIcon icon={faLinkedin} size="lg" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="row">
                            <div className="col-6">
                                <h5 className="fw-bold mb-3 text-light">Company</h5>
                                <ul className="list-unstyled">
                                    <li><Link to="/About" className="text-decoration-none text-white">About us</Link></li>
                                    <li><Link to="/Blog" className="text-decoration-none text-white">Blog</Link></li>
                                    <li><Link to="/Contact" className="text-decoration-none text-white">Contact us</Link></li>
                                    <li><Link to="/Pricing" className="text-decoration-none text-white">Pricing</Link></li>
                                    <li><Link to="/Testmonial" className="text-decoration-none text-white">Testimonials</Link></li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <h5 className="fw-bold mb-3 text-light">Support</h5>
                                <ul className="list-unstyled">
                                    <li><Link to="/Help Center" className="text-decoration-none text-white">Help center</Link></li>
                                    <li><Link to="/Term Of Service" className="text-decoration-none text-white">Terms of service</Link></li>
                                    <li><Link to="/Legal" className="text-decoration-none text-white">Legal</Link></li>
                                    <li><Link to="/Privacy" className="text-decoration-none text-white">Privacy policy</Link></li>
                                    <li><Link to="/Status" className="text-decoration-none text-white">Status</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold mb-3 text-light">Stay up to date</h5>
                        <form ref={form} onSubmit={sendEmail}>
                            <div className="d-flex">
                                <input
                                    type="email"
                                    name="user_email" 
                                    className="form-control me-2"
                                    placeholder="Your email address"
                                    required
                                />
                                <button type="submit" className="btn btn-success px-3 text-white" style={{ border: 'none' }}>
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;