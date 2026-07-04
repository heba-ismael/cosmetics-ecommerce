import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageTransition from "../../components/PageTransition";
import { FaShippingFast, FaHeart, FaLeaf } from "react-icons/fa";
import "./About.css";

function About() {
  useEffect(() => {
    document.title = "About Us | Cosmatics";
  }, []);

  return (
    <PageTransition>
      <div className="about_page">
        <div className="container">
          <div className="about_hero">
            <h1>About Cosmatics</h1>
            <p>
              Cosmatics is an online store built for women who love beauty
              products, bags, and shoes that make them feel confident every
              day. We bring together carefully picked pieces so you can find
              everything you need for your everyday look in one place.
            </p>
          </div>

          <div className="about_features">
            <div className="feature_card">
              <FaHeart />
              <h3>Curated With Care</h3>
              <p>
                Every product on Cosmatics is chosen to match real style
                needs, not just trends.
              </p>
            </div>
            <div className="feature_card">
              <FaShippingFast />
              <h3>Easy Shopping</h3>
              <p>
                A simple, fast browsing experience across beauty, bags, and
                shoes categories.
              </p>
            </div>
            <div className="feature_card">
              <FaLeaf />
              <h3>Quality First</h3>
              <p>
                We focus on products that hold up to daily use, not just how
                they look in a photo.
              </p>
            </div>
          </div>

          <div className="about_cta">
            <h2>Ready to explore?</h2>
            <Link to="/" className="btn">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default About;
