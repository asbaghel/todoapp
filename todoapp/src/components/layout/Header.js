import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header style={headerStyle}>
        <h1>TodoList</h1>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        |{" "}
        <Link style={linkStyle} to="/about">
          About
        </Link>
      </header>
    );
  }
}

export default Header;

//SOme Styling

const headerStyle = {
  background: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "10px"
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none"
};
