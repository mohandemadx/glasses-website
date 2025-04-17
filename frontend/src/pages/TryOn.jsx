import { Container, Row, Col, Button } from 'react-bootstrap';

function TryOn() {
  const handleChange = (direction) => {
    fetch('http://localhost:5000/change', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ direction })
    });
  };

  return (
    <Container className="py-5 text-center">
      <h2 className="mb-4 fw-bold">Virtual Try-On</h2>
      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <img
            src="http://localhost:5000/video_feed"
            alt="Virtual Try-On"
            className="img-fluid rounded shadow"
            style={{ maxHeight: '480px' }}
          />
        </Col>
      </Row>
      <div>
        <Button variant="outline-dark" className="me-3" onClick={() => handleChange('prev')}>
          ⬅ Previous
        </Button>
        <Button variant="dark" onClick={() => handleChange('next')}>
          Next ➡
        </Button>
      </div>
    </Container>
  );
}

export default TryOn;
