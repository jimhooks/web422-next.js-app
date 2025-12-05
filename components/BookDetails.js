/*********************************************************************************
*  WEB422 – Assignment 3
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Jim Aminu  Student ID: 131301236  Date: 11/04/2025
*
*  Vercel App (Deployed) Link: https://web422-next-js-app.vercel.app
*
********************************************************************************/

import { Container, Row, Col, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState, useEffect } from "react";


import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);


  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId));
  }, [favouritesList, workId]);


  async function favouritesClicked() {
    let updatedList = [];

    if (showAdded) {
      // REMOVE from favourites (API)
      updatedList = await removeFromFavourites(workId);
    } else {
      // ADD to favourites (API)
      updatedList = await addToFavourites(workId);
    }

    // Update Atom with backend data
    setFavouritesList(updatedList);
  }

  if (!book) return null;

  return (
    <Container>
      <Row>
        {/* Left Column (Image) */}
        <Col lg={4}>
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src =
                "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt="Cover Image"
          />
          <br />
          <br />
        </Col>

        {/* Right Column (Details) */}
        <Col lg={8}>
          <h3>{book.title}</h3>

          {book.description && (
            <p>
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}
          <br />

          {book.subject_people && book.subject_people.length > 0 && (
            <>
              <h5>Characters</h5>
              {book.subject_people.join(", ")}
              <br />
              <br />
            </>
          )}

          {book.subject_places && book.subject_places.length > 0 && (
            <>
              <h5>Settings</h5>
              {book.subject_places.join(", ")}
              <br />
              <br />
            </>
          )}

          {book.links && book.links.length > 0 && (
            <>
              <h5>More Information</h5>
              {book.links.map((link, index) => (
                <span key={index}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.title}
                  </a>
                  <br />
                </span>
              ))}
            </>
          )}

          {/* Favourite Button */}
          {showFavouriteBtn && (
            <Button
              variant={showAdded ? "primary" : "outline-primary"}
              onClick={favouritesClicked}
              className="mt-3"
            >
              {showAdded ? "+ Favourite (added)" : "+ Favourite"}
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}
