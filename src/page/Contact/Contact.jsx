import { useEffect, useState } from "react";
import PageTransition from "../../components/PageTransition";
import { MdEmail } from "react-icons/md";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import toast from "react-hot-toast";
import "./Contact.css";

const CONTACT_EMAIL = "cosmatics@gmail.com";

// Placeholder links - replace with the store's real social media pages
const SOCIAL_LINKS = {
  instagram: "https://instagram.com/cosmatics.store",
  facebook: "https://facebook.com/cosmatics.store",
  tiktok: "https://tiktok.com/@cosmatics.store",
};

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    document.title = "Contact Us | Cosmatics";
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // No real backend to receive the message, so we simulate a confirmation
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thanks! Your message has been sent.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <PageTransition>
      <div className="contact_page">
        <div className="container">
          <h1>Contact Us</h1>
          <p className="contact_intro">
            Have a question about an order or a product? Reach out, we'd love
            to hear from you.
          </p>

          <div className="contact_grid">
            <div className="contact_info">
              <a href={`mailto:${CONTACT_EMAIL}`} className="contact_email">
                <MdEmail /> {CONTACT_EMAIL}
              </a>

              <div className="social_links">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
                  <FaTiktok />
                </a>
              </div>
            </div>

            <form className="contact_form" onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              />

              <button type="submit" className="btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Contact;
