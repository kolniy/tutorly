import React from 'react'
import { 
    Row,
    Col,
    Container,
    Form,
    FormGroup,
    Button,
    Card,
    CardBody
} from "reactstrap"
import DashboardNavbar from "./DashboardNavbar"

import "../../custom-styles/dashboard/dashboardlayout.css";
import "../../custom-styles/dashboard/createcourse.css"

const CreateCourse = () => {
    return <>
        <div className="dashboard-layout">
            <Container fluid>
                <Row>
                <DashboardNavbar />
                 <Col>
        <div className="page-actions">
        <div className="page-actions__create-course-form">
      <Card className="shadow create-course-card">
          <CardBody>
          <h1 className="page-action__info text-center">
            Create New Course
          </h1>
        <Form>
          <FormGroup>
          <input
            type="text"
            class="form__input"
            placeholder="Course Title"
            name="title"
            id="title"
            required
            autoFocus
            />
          <label for="title" className="form__label">Course Title</label>
        </FormGroup>
        <FormGroup>
            <input
            type="text"
            class="form__input"
            placeholder="Course Subtitle"
            name="subtitle"
            id="subtitle"
             required
            />
            <label for="subtitle" className="form__label">Course Subtitle</label>
        </FormGroup>
         <FormGroup>
            <input
            type="number"
            class="form__input"
            placeholder="Number of Classes"
            name="numberofclasses"
            id="numberofclasses"
            required
            />
            <label for="numberofclasses" className="form__label">Number of classes</label>
            </FormGroup>
        <FormGroup>
            <input
            type="text"
            class="form__input"
            placeholder="Name of Tutor"
            name="nameoftutor"
            id="nameoftutor"
            required
            />
            <label for="nameoftutor" className="form__label">Name of Tutor</label>
        </FormGroup>
            <FormGroup className="mt-5">
            <Button
            className="create-course-btn"
             type="submit"
             size="lg"
             >
                Create Course
             </Button>
          </FormGroup>
          </Form>
          </CardBody>
           </Card>
                   </div>
                 </div>
                 </Col>
                </Row>
            </Container>
        </div>
    </>
}

export default CreateCourse
