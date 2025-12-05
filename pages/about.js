import Link from "next/link";
import { Card } from "react-bootstrap";
import BookDetails from "@/components/BookDetails";
import PageHeader from "@/components/PageHeader";


export async function getStaticProps() {
  const res = await fetch("https://openlibrary.org/works/OL18396W.json");
  const data = await res.json();

  return { props: { book: data } };
}

export default function About({ book }) {
  return (
    <>
      <PageHeader text="About the Developer: Jim Aminu" />

      <Card className="mb-3">
        <Card.Body>
          <p>
            Hi, I’m Jim Aminu. I’m studying Computer Programming and Analysis at Seneca. 
            I enjoy learning how to build modern web apps with React, Next.js, and databases. and 
            also enjoy learning web i hope you will enjoy this project 

          </p>
          <p>
            I chose this book because it’s a well-known title on OpenLibrary, and I wanted 
            to explore how to pull real-world data into a web app using their API.
          </p>
        </Card.Body>
      </Card> 

      {}
      <BookDetails book={book} />
    </>
  );
}



