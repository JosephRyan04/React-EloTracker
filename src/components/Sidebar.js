import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { House } from "@phosphor-icons/react";
/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">      </Navbar.Collapse> */

export default function Sidebar() {
  return (
    <Navbar sticky="top" className="flex-column Sidebar container hidden-sm">
      <Nav.Item>
      
        <Nav.Link href="/"> <House size={32} color="#310057" weight="duotone" /> Home </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
      </Nav.Item>

    </Navbar>
  );
}