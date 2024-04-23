import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { House, Trophy, Question } from "@phosphor-icons/react";
/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">      </Navbar.Collapse> */

export default function Sidebar() {
  return (
    <Navbar sticky="top" className="flex-column Sidebar container hidden-sm">
      <Nav.Item>
        <Nav.Link href="/">
          <div className="d-flex align-items-center p-1 gap-4">
            <House size={32} color="#ffffff" weight="duotone" /> <h5>Home</h5>
          </div>
          </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/leaderboard">
        <div className="d-flex align-items-center p-1 gap-4"> 
          <Trophy size={32} color="#ffffff" weight="duotone" /> <h5>Leaderboard</h5> 
        </div>
          </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/about">
        <div className="d-flex align-items-center p-1 gap-4"> 
          <Question size={32} color="#ffffff" weight="duotone" /> <h5>About</h5> 
        </div>
          </Nav.Link>
      </Nav.Item>

    </Navbar>
  );
}