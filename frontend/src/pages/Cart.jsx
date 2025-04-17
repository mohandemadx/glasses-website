// ======= src/pages/Cart.jsx =======
import { useCart } from '../contexts/CartContext';
import { Container, ListGroup } from 'react-bootstrap';

function Cart() {
  const { cartItems } = useCart();

  return (
    <Container>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ListGroup>
          {cartItems.map((item, i) => (
            <ListGroup.Item key={i}>
              {item.name} - ${item.price.toFixed(2)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default Cart;
