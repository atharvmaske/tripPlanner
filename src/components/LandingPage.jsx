import React from "react";
import Head from "./Head";
import "./LandingPage.css";
import { Link } from "react-router-dom"; 
import image1 from './images/travel1.jpg'
import image2 from './images/paris.jpg'
import image3 from './images/bali.jpg'
import image4 from './images/tokyo.jpg'




const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <nav className="navbar">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#destinations">Destinations</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero-section "  style={{
    backgroundImage: `url(${image1})`, 
    backgroundSize: "cover",          
    backgroundPosition: "center",     
    borderRadius:'49px',
    backgroundRepeat: "no-repeat"       
  }}>
    
        <h1>Plan Your Perfect Getaway</h1>
        <p>Discover, plan, and book unforgettable trips with ease.</p>
        <Link to="/getstarted">
          <button className="cta-button">Get Started</button>
        </Link>
      </section>

      <section id="about" className="about-section">
        <h2>About Us</h2>
        <p>
          We are dedicated to making your travel dreams come true. Explore new
          destinations, customize your itinerary, and create memories that last
          a lifetime.
        </p>
      </section>

      <section id="destinations" className="destinations-section">
        <h2>Top Destinations</h2>
        <div className="destination-cards">
          <div className="card">
            <img src={image2} alt="Destination 1" />
            <h3>Paris</h3>
          </div>
          <div className="card">
            <img src={image3} alt="Destination 2" />
            <h3>Bali</h3>
          </div>
          <div className="card">
            <img src={image4} alt="Destination 3" />
            <h3>Tokyo</h3>
          </div>
        </div>
      </section>

      <section id="services" className="services-section">
  <h2>Our Services</h2>
  <div className="services-container">
    <div className="service-item">
      <i className="fas fa-route"></i>
      <h3>Personalized Itineraries</h3>
      <p>Plan trips tailored to your preferences and needs.</p>
    </div>
    <div className="service-item">
      <i className="fas fa-plane"></i>
      <h3>Flight & Hotel Bookings</h3>
      <p>Enjoy hassle-free travel arrangements.</p>
    </div>
    <div className="service-item">
      <i className="fas fa-shield-alt"></i>
      <h3>Travel Insurance</h3>
      <p>Secure your trips with our trusted insurance plans.</p>
    </div>
    <div className="service-item">
      <i className="fas fa-headset"></i>
      <h3>24/7 Customer Support</h3>
      <p>We are here to assist you anytime, anywhere.</p>
    </div>
  </div>
</section>

<footer id="contact" className="footer">
  <h2>Contact Us</h2>
  <div className="contact-info">
    <p><i className="fas fa-envelope"></i> Email: support@tripplanner.com</p>
    <p><i className="fas fa-phone-alt"></i> Phone: +1 234 567 890</p>
  </div>
  <p>Follow us on social media:</p>
</footer>

    </div>
  );
};

export default LandingPage;
