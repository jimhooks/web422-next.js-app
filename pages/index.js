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
*  Vercel App (Deployed) Link: _________________________________________________
*
********************************************************************************/


import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  const router = useRouter();

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 
  const onSubmit = (data) => {
    router.push({
      pathname: "/books",
      query: Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== "")
      ),
    });
  };

  return (
    <>
      <PageHeader
        text="Book Search"
        subtext="Search for books by author, title, subject, language, or year."
      />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12}>
            <Form.Group controlId="formAuthor" className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                // ✅ required validation
                {...register("author", { required: "Author is required" })}
                className={errors.author ? "is-invalid" : ""}
              />
              {errors.author && (
                <Form.Text className="text-danger">
                  {errors.author.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                {...register("title")}
              />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group controlId="formSubject" className="mb-3">
              <Form.Label>Subject (contains)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject keyword"
                {...register("subject")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={6}>
            <Form.Group controlId="formLanguage" className="mb-3">
              <Form.Label>Language Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter language code (e.g. eng)"
                maxLength="3"
                {...register("language")}
              />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group controlId="formPublishYear" className="mb-3">
              <Form.Label>First Published (Year)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter published year"
                {...register("first_publish_year")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <Button
              variant="primary"
              type="submit"
              className="w-100 py-3 fs-5"
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
