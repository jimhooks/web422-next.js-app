/*********************************************************************************
*  WEB422 – Assignment 2
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Jim Aminu  Student ID: 131301236  Date: 11/04/2025
********************************************************************************/

import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Pagination, Table } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Books() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const router = useRouter();


  const queryString = new URLSearchParams(router.query).toString();

 
  const { data, error } = useSWR(
    queryString
      ? `https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10`
      : null
  );

  useEffect(() => {
    if (data) setPageData(data);
  }, [data]);

  const previous = () => page > 1 && setPage(page - 1);
  const next = () => setPage(page + 1);

  
  const querySummary = Object.entries(router.query)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  return (
    <>
      <PageHeader text="Search Results" subtext={querySummary} />

      {error && <p>Error loading books.</p>}
      {!data && <p>Loading...</p>}

      {pageData?.docs && (
        <>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>First Publish Year</th>
              </tr>
            </thead>
            <tbody>
              {pageData.docs.map((book, index) => (
                <tr
                  key={index}
                  onClick={() =>
                    router.push(`/works${book.key.replace("/works", "")}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <td>{book.title}</td>
                  <td>{book.first_publish_year || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <Pagination.Prev onClick={previous} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={next} />
          </Pagination>
        </>
      )}
    </>
  );
}
