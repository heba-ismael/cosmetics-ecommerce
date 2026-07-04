import { RiArrowDropDownFill } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getAllCategories } from "../../api/api";
import { SITE_CATEGORIES } from "../../constants";

const NavLinks = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Contact", link: "/contact" },
];

function BtmHeader() {
  const location = useLocation();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    setIsCategoryOpen(false);
  }, [location]);

  const { data: allCategories } = useFetch(getAllCategories, []);

  const categories = (allCategories || []).filter((cat) =>
    SITE_CATEGORIES.includes(cat.slug),
  );

  return (
    <div className="btm_header">
      <div className="container">
        <nav className="nav">
          <div className="category_nav">
            <button
              type="button"
              className="category_btn"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              aria-expanded={isCategoryOpen}
              aria-label="Browse Category"
            >
              <IoMenu />
              <p> Browse Category</p>
              <RiArrowDropDownFill />
            </button>
            <div
              className={`category_nav_list ${isCategoryOpen ? "active" : ""}`}
            >
              {categories.map((category) => (
                <Link key={category.slug} to={`/category/${category.slug}`}>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <ul className="nav_links">
            {NavLinks.map((item) => (
              <li
                key={item.link}
                className={location.pathname === item.link ? "active" : ""}
              >
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default BtmHeader;
