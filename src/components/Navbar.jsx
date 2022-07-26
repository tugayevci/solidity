import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import WalletBalance from "./WalletBalance";

export default function NavbarComp() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>NFT MARKETPLACE</Navbar.Brand>
        <Nav>
          <Nav.Link>
            <WalletBalance />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
