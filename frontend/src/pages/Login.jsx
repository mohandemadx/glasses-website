// ======= src/pages/Login.jsx =======
import { useAuth } from '../contexts/AuthContext';
import { Container, Button } from 'react-bootstrap';

function Login() {
  const { user, login, logout } = useAuth();

  return (
    <Container className="text-center">
      <h1>{user ? `Hello, ${user.email}` : 'Login'}</h1>
      {user ? (
        <Button variant="outline-danger" onClick={logout}>Logout</Button>
      ) : (
        <Button variant="primary" onClick={() => login('user@example.com')}>Login</Button>
      )}
    </Container>
  );
}

export default Login;