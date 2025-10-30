import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 
                 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
};

const Navbar = ({ user, setUser }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const delay = setTimeout(() => {
      navigate(search.trim() ? `/?search=${encodeURI(search)}` : "/");
    }, 500);
    return () => clearTimeout(delay);
  }, [search, navigate, user]);

  useEffect(() => {
    setSearch("");
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="text-gray-900 dark:text-gray-100 p-4 bg-white dark:bg-gray-900 shadow-lg">
      <div className="container mx-auto flex items-center justify-between space-x-2">
        <Link to="/" className="text-xl font-bold">
          Notes-App
        </Link>
        {user && (
          <>
            <div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes..."
                aria-label="Search notes"
                className="w-full px-4 py-2 bg-gray-200 dark:bg-slate-800 
                           text-gray-800 dark:text-gray-200 border border-gray-100 
                           dark:border-gray-700 rounded-md focus:outline-none 
                           focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
              <DarkModeToggle />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
