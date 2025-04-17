import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand className="fw-bold fs-4">
          <Link to="/" className="text-decoration-none text-dark">👓 Glasses Store</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto gap-4">
            <Link to="/" className="nav-link fw-medium text-dark">Home</Link>
            <Link to="/about" className="nav-link fw-medium text-dark">About</Link>
            <Link to="/products" className="nav-link fw-medium text-dark">Products</Link>
            <Link to="/tryon" className="nav-link fw-medium text-dark">Try On</Link>
            <Link to="/cart" className="nav-link fw-medium text-dark">Cart</Link>
            <Link to="/login" className="nav-link fw-medium text-dark">Login</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
