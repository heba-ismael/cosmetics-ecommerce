
import  { useEffect, useState } from "react";
import { BsSearchHeart } from "react-icons/bs"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { searchProducts } from "../../api/api";
import { SITE_CATEGORIES } from "../../constants";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  const location = useLocation()

  const handleSbumit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
    setSuggestions([]);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const data = await searchProducts(searchTerm);
        const filtered = (data.products || []).filter((item) =>
          SITE_CATEGORIES.includes(item.category),
        );
        setSuggestions(filtered.slice(0, 5));
      } catch (error) {
        console.error("Search Error :", error);
        setSuggestions([]);
      }
    };

    const debonuce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debonuce);
  }, [searchTerm]);



  useEffect(() => {
    setSuggestions([]);
  }, [location])

  return (
    <div className="searchBox_Container">
      <form onSubmit={handleSbumit} className="search_box">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search For Products"
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">
          <BsSearchHeart />
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions">
  {suggestions.map((item) => (
    <li key={item.id}>
      <Link
        to={`/products/${item.id}`}
        onClick={() => setSuggestions([])}
      >
        <img src={item.images[0]} alt={item.title} />
        <span>{item.title}</span>
      </Link>
    </li>
  ))}
</ul>
      )}
    </div>
  );
}

export default SearchBox;