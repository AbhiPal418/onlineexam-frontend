import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/react.svg";


function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="logo">
          {/* <img src={logo} alt="ExamPortal Logo" /> */}

          <span>Test Zone</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-buttons">
          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/register" className="register-btn">
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;