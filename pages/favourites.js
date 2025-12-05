/*********************************************************************************
*  WEB422 – Assignment 3
*
*  Name: Jim Aminu  Student ID: 131301236  Date: 11/26/2025
********************************************************************************/

import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/Bookcard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  // 🔥 REQUIRED FIX (Assignment step 4)
  // Prevents the page from incorrectly showing "Nothing Here"
  // while favourites are still loading from the API
  if (!favouritesList) return null;

  if (favouritesList.length === 0) {
    return (
      <PageHeader
        text="Nothing Here"
        subtext="Add a book to your favourites list!"
      />
    );
  }

  return (
    <>
      <PageHeader text="Favourites" subtext="Your Favourite Books" />
      <Row className="gy-4">
        {favouritesList.map((workId) => (
          <Col lg={3} md={6} key={workId}>
            <BookCard workId={workId} />
          </Col>
        ))}
      </Row>
    </>
  );
}
