import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageTransition from "../../components/PageTransition";
import "./NotFound.css";

function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found | Cosmatics";
  }, []);

  return (
    <PageTransition>
      <div className="not_found_page">
        <h1>404</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn">
          Back To Home
        </Link>
      </div>
    </PageTransition>
  );
}

export default NotFound;
