import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
class NavigationBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Mapathon</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {this.props.isAuthenticated ? (
              <div>
                <Button
                  variant="outline-warning"
                  className="mr-sm-2"
                  onClick={this.props.handleGetPOI}
                >
                  Get POIs
                </Button>

                <Button
                  variant="outline-info"
                  className="mr-sm-2"
                  onClick={this.props.handleMenu}
                >
                  Menu
                </Button>

                <Button
                  variant="outline-danger"
                  className="mr-sm-2"
                  onClick={this.props.handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="outline-success"
                className="mr-sm-2"
                onClick={this.props.handleLogin}
              >
                Login
              </Button>
            )}
          </Navbar.Collapse>
        </Navbar>{" "}
      </React.Fragment>
    );
  }
}

export default NavigationBar;
