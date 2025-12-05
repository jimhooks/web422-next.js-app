import { Container } from "react-bootstrap";
import MainNav from "./MainNav";

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      <Container className="mt-4">
        {children}
      </Container>
      <br />
    </>
  );
}


