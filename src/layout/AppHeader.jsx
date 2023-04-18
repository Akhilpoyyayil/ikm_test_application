import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import imag from "./imag.PNG";
import { Avatar } from "@mui/material";

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img src={imag}></img>Grave Sites Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Maintain" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#features">
              <i class="fa fa-grav" aria-hidden="true"></i>Payments
            </Nav.Link>
            <Nav.Link href="#pricing">
              <i class="fa fa-grav" aria-hidden="true"></i>Report
            </Nav.Link>
          </Nav>
          <Nav>
            <i
              class="fa fa-usd"
              style={{ textAlign: "center" }}
              aria-hidden="true"
            ></i>
            <Avatar style={{ backgroundColor: "green" }}>KB</Avatar>
            <Nav.Link eventKey={2} href="#memes">
              <b>John Snow</b>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
