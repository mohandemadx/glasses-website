// ======= src/pages/About.jsx =======
import { Container, Row, Col, Image } from 'react-bootstrap';

function About() {
  return (
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md={6} className="mb-4 mb-md-0">
          <Image 
            src="/images/about.jpg" 
            alt="Our Story" 
            fluid 
            rounded 
            className="shadow"
          />
        </Col>
        <Col md={6}>
          <h2 className="fw-bold">Our Story</h2>
          <p className="text-muted">
            At Glasses Store, we believe that eyewear is more than just a necessity — it's a reflection of your personality and lifestyle. Our journey began with a simple idea: to make stylish, high-quality eyewear accessible to everyone.
          </p>
          <p className="text-muted">
            Whether you're looking for a bold statement frame or something sleek and minimal, our curated collection has something for every face and every fashion sense.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default About;