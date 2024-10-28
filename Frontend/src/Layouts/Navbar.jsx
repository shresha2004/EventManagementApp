import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userEmail"));
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const navigate = useNavigate();

    const handleLoginClose = () => setShowLogin(false);
    const handleLoginShow = () => setShowLogin(true);
    const handleRegisterClose = () => setShowRegister(false);
    const handleRegisterShow = () => setShowRegister(true);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            localStorage.setItem("userEmail", email);
            setIsLoggedIn(true);
            setShowLogin(false);
            navigate('/');
        } else {
            alert('Login failed');
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            alert('Registration successful! You can now log in.');
            setShowRegister(false);
            setShowLogin(true);
        } else {
            alert('Registration failed');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <BootstrapNavbar expand="lg" className="bg-light shadow-sm p-3  rounded" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img src="https://res.cloudinary.com/dtyu88isr/image/upload/v1730046295/tudy51559ntytgeqyqew.png" alt="GDSC Logo" width="40" height="40" className="d-inline-block align-top me-2" />
                    <span className="text-primary fw-bold" style={{ fontSize: '1.5em' }}>GDSC</span>
                </a>
                <BootstrapNavbar.Toggle aria-controls="navbarNavAltMarkup" />
                <BootstrapNavbar.Collapse id="navbarNavAltMarkup">
                    <Nav className="me-auto">
                        <Nav.Link href="#" className="text-dark fw-bold">Home</Nav.Link>
                        <Nav.Link href="#" className="text-dark fw-bold">About Us</Nav.Link>
                        <Nav.Link href="#" className="text-dark fw-bold">Events</Nav.Link>
                        <Nav.Link href="#" className="text-dark fw-bold">Gallery</Nav.Link>
                        <Nav.Link href="#" className="text-dark fw-bold">Contact</Nav.Link>
                    </Nav>
                    <div className="d-flex">
                        {!isLoggedIn ? (
                            <>
                                <Button variant="outline-primary" onClick={handleLoginShow} className="me-2 fw-bold">Login</Button>
                                <Button variant="primary" onClick={handleRegisterShow} className="fw-bold">Register</Button>
                            </>
                        ) : (
                            <Button variant="secondary" onClick={handleLogout} className="fw-bold">Logout</Button>
                        )}
                    </div>
                </BootstrapNavbar.Collapse>
            </div>

            {/* Login Modal */}
            <Modal show={showLogin} onHide={handleLoginClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleLoginSubmit}>
                        <Form.Group controlId="loginEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" required />
                        </Form.Group>
                        <Form.Group controlId="loginPassword" className="mt-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Enter password" required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3 w-100">Login</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Register Modal */}
            <Modal show={showRegister} onHide={handleRegisterClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleRegisterSubmit}>
                        <Form.Group controlId="registerEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" required />
                        </Form.Group>
                        <Form.Group controlId="registerPassword" className="mt-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Enter password" required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3 w-100">Register</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </BootstrapNavbar>
    );
}

export default Navbar;
