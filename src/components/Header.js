import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function Header() {
  return (
    <Navbar  sticky="top" className="Header">
      <Container fluid className='m-0'>
        <Navbar.Brand>Elo Tracker</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
