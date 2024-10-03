import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import api from "../../axiosConfig/axios";

function NavBar() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    api
      .post("/auth/logout")
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        navigate("/login");
      })
      .catch(() => {
        navigate("/login");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      })
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Projects App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/Projects");
              }}
            >
             Projects
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/Tasks");
              }}
            >
              My tasks
            </Nav.Link>
          </Nav>
          <NavDropdown
            title={localStorage.getItem("user") || "usuario"}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item onClick={handleLogOut}>LogOut</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
