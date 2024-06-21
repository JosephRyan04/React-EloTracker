import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { List, XCircle } from "@phosphor-icons/react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsopen] = useState(false);

  function toggleSidebar() {
    const sidebar = document.querySelector(".Sidebar");
    if (sidebar) {
      sidebar.style.display = "flex";
      if (!isOpen) {
        setIsopen(true);
        sidebar.style.left = "2px";
      } else {
        setIsopen(false);
        sidebar.style.left = "-100vw";
      }
    }
    // Add logic for darkening rest of page when sidebar is focused
    // const Body = document.querySelector(".content-container");
  }

  return (
    <Navbar sticky="top" className="Header">
      <Container fluid className="m-0">
        <Navbar.Brand href="/">Slippi Tracker</Navbar.Brand>
        <Navbar.Brand onClick={toggleSidebar} className="HeaderButton">
          {!isOpen && <List size={32} color="#ffffff" weight="bold" />}
          {isOpen && <XCircle size={32} color="#ffffff" weight="bold" />}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
