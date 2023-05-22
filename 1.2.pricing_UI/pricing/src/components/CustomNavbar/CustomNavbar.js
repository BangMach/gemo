import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBell } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";
import gemoLogo from "../../images/gemologo.png";

class CustomNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount = () => {};

  handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  render() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user == null) {
      return <Navigate to="/login" />;
    }
    return (
      <Navbar bg="light" expand="lg" className="mb-4">
        <div className="container-fluid">
          <Navbar.Brand href="/menu">
            <img
              src={gemoLogo}
              height="auto"
              width="70px"
              alt="Logo"
              loading="lazy"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link href="/menu">Menu</Nav.Link>
              <Nav.Link href="/orders">Orders</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="d-flex align-items-center">
            <a className="text-reset me-3" href="#">
              <FontAwesomeIcon icon={faShoppingCart} />
            </a>
            <NavDropdown title={user.username} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action1">{user.role}</NavDropdown.Item>
              <NavDropdown.Item href="#action2" onClick={this.handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
      </Navbar>
    );
  }
}

export default CustomNavbar;
