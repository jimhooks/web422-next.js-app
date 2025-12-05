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

import useSWR from "swr";
import Error from "next/error";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function BookCard({ workId }) {
  const { data, error } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  
  if (error || !data) return <Error statusCode={404} />;

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        className="img-fluid"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/300x400?text=Cover+Not+Available";
        }}
        src={`https://covers.openlibrary.org/b/id/${
          data.covers ? data.covers[0] : "placeholder"
        }-M.jpg`}
        alt={data.title}
      />

      <Card.Body>
        <Card.Title>{data.title || "Untitled"}</Card.Title>
        <Card.Text>
          {data.first_publish_date || "N/A"}
        </Card.Text>

        <Link href={`/works/${workId}`} passHref legacyBehavior>
          <Button variant="primary" className="w-100">
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
