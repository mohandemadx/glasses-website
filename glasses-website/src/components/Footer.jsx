// ======= src/components/Footer.jsx =======
import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light text-center text-muted py-3 mt-auto shadow-sm">
      <Container>
        <small>&copy; {new Date().getFullYear()} Glasses Store — All rights reserved</small>
      </Container>
    </footer>
  );
}

export default Footer;