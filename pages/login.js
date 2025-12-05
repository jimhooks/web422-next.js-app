import { useState } from "react";
import { useRouter } from "next/router";
import { Card, Form, Alert, Button } from "react-bootstrap";
import { authenticateUser } from "@/lib/authenticate";
import { getFavourites } from "@/lib/userData";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";

export default function Login() {
  const router = useRouter();

  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  // Atom reference
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  // Update favourites from database after login
  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await authenticateUser(user, password);  // login
      await updateAtom();                      // load user's favourites
      router.push("/");                        // redirect home
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          Enter your login information below:
        </Card.Body>
      </Card>
      <br />

      {/* Error message */}
      {warning && (
        <>
          <Alert variant="danger">{warning}</Alert>
          <br />
        </>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            id="userName"
            name="userName"
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>

        <br />

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <br />

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}
