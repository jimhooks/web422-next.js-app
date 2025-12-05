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
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/Bookcard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  
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
