"use client";

import Link from "next/link";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { readToken, removeToken } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MainNav() {
  const router = useRouter();
  const [token, setToken] = useState(null);   // <-- FIX: State instead of SSR call

  function logout() {
    removeToken();
    setToken(null);
    router.push("/login");
  }

  useEffect(() => {
  // Runs when component mounts AND whenever route changes
  const handleRouteChange = () => {
    setToken(readToken());
  };

  // Run initially
  handleRouteChange();

  // Listen for route changes
  router.events.on("routeChangeComplete", handleRouteChange);

  // Cleanup
  return () => {
    router.events.off("routeChangeComplete", handleRouteChange);
  };
}, [router]);


  return (
    <>
      <Navbar bg="primary" variant="dark" expand="md" className="fixed-top shadow-sm">
        <Container>
          <Navbar.Brand as={Link} href="/" passHref className="fw-bold text-white">
            Jim Aminu
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">

            {/* LEFT NAV */}
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/about" passHref>About</Nav.Link>
            </Nav>

            {/* RIGHT NAV */}
            <Nav>

              {/* Logged in */}
              {token && (
                <NavDropdown title={token.userName} id="user-dropdown">
                  <NavDropdown.Item as={Link} href="/favourites" passHref>
                    Favourites
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              {/* Logged OUT */}
              {!token && (
                <Nav.Link as={Link} href="/register" passHref>
                  Register
                </Nav.Link>
              )}

            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      <br /><br />
    </>
  );
}
