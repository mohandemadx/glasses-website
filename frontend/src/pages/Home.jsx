// ======= src/pages/Home.jsx =======
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-light py-5 text-center">
      <Container>
        <h1 className="display-4 fw-bold">Find Your Perfect Look</h1>
        <p className="lead text-muted mb-4">
          Discover stylish frames that match your vibe and fit like a dream.
        </p>
        <Link to="/products">
          <Button variant="dark" size="lg">Browse Collection</Button>
        </Link>
      </Container>
      <div className="mt-5">
        <img 
          src="/images/hero.jpg" 
          alt="Hero Glasses" 
          className="img-fluid rounded shadow" 
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}

export default Home;