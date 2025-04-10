import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLogin(!!localStorage.getItem("token"));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleAuthClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <header>
        <h2>Cook-Book App</h2>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={isLogin ? "/myRecipe" : "/login"}
              className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
            >
              My Recipe 
            </NavLink>
          </li>
          <li>
            <NavLink
              to={isLogin ? "/favRecipe" : "/login"}
              className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
            >
              Favourites
            </NavLink>
          </li>
          <li onClick={handleAuthClick}>
            <p className='login'>
              {isLogin ? "Logout" : "Login"}
              {user?.email ? ` (${user.email})` : ""}
            </p>
          </li>
        </ul>
      </header>
    </>
  );
}
