// ======= src/pages/Products.jsx =======
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';

function Products() {
  const { addToCart } = useCart();

  const glassesList = [
    {
      id: 1,
      name: 'Modern Black Frame',
      price: 59.99,
      image: '/images/product1.jpg'
    },
    {
      id: 2,
      name: 'Classic Tortoise Shell',
      price: 69.99,
      image: '/images/product2.jpg'
    },
    {
      id: 3,
      name: 'Bold Round Frame',
      price: 49.99,
      image: '/images/product3.jpg'
    }
  ];

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center fw-bold">Our Glasses Collection</h2>
      <Row>
        {glassesList.map(product => (
          <Col key={product.id} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="text-muted mb-4">${product.price.toFixed(2)}</Card.Text>
                <Button variant="dark" onClick={() => addToCart(product)} className="mt-auto">Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;