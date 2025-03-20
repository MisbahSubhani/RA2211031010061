import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title ">React-Social App</h1>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Top Users</Link>
          <Link to="/trending" className="nav-link">Trending Posts</Link>
          <Link to="/feed" className="nav-link">Feed</Link>
        </div>
      </div>
    </nav>
  );
}
