import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">      </Navbar.Collapse> */

export default function Sidebar() {
  return (
    <Navbar expand="lg" sticky="top" className="flex-column Sidebar">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
      </Nav.Item>

    </Navbar>
  );
}