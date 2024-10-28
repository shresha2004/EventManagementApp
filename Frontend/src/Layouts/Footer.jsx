
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container text-center">
                <div className="row">
                    <div className="col-lg-4 col-md-6 mb-3">
                        <h5>About Us</h5>
                        <p>We are a student community at GDSC NMIT, dedicated to bringing tech enthusiasts together to learn and grow.</p>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-3">
                        <h5>Contact Us</h5>
                        <p>Email: support@gdscnmit.com</p>
                        <p>Phone: +91 9606338467</p>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-3">
                        <h5>Follow Us</h5>
                        <p>
                            <a href="#" className="social-icon"><i className="bi bi-facebook"></i> Facebook</a>
                        </p>
                        <p>
                            <a href="#" className="social-icon"><i className="bi bi-twitter"></i> Twitter</a>
                        </p>
                        <p>
                            <a href="#" className="social-icon"><i className="bi bi-instagram"></i> Instagram</a>
                        </p>
                    </div>
                </div>
                <hr />
                <div className="text-center">
                    <p>© {new Date().getFullYear()} GDSC NMIT. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
