import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { categories as dummyCategories } from "../../dummyData";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // محاكاة جلب الفئات
    setCategories(dummyCategories);
  }, []);

  return (
    <div className="sidebar">
      <h5 className="sidebar-title">CATEGORIES</h5>
      <ul className="sidebar-links">
        {categories.map((category) => (
          <Link
            className="sidebar-link"
            key={category._id}
            to={`/posts/categories/${category.title}`}
          >
            {category.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
