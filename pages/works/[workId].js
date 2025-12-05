/*********************************************************************************
*  WEB422 – Assignment 3
*
*  Name: Jim Aminu  Student ID: 131301236  Date: 11/26/2025
********************************************************************************/

import { useRouter } from "next/router";
import useSWR from "swr";
import BookDetails from "@/components/BookDetails";
import Error from "next/error";
import PageHeader from "@/components/PageHeader";

export default function WorkDetails() {
  const router = useRouter();
  const { workId } = router.query;

  const { data, error } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  if (error) return <Error statusCode={404} />;
  if (!data) return <p>Loading...</p>;

  return (
    <>
      <PageHeader text="Book Details" />
      <BookDetails book={data} workId={workId} />
    </>
  );
}
