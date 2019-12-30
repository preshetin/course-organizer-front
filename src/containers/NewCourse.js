import React, { useState } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, HelpBlock } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewCourse.css";

export default function NewCourse(props) {
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return startDate.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      await createCourse({ description, startDate });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createCourse(course) {
    return API.post("courses", "/courses", {
      body: course
    });
  }

  return (
    <div className="NewCourse">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="description">
          <FormControl
            value={description}
            bsSize='large'
            placeholder="Course description"
            onChange={e => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="startDate">
          <FormControl
            value={startDate}
            bsSize='large'
            placeholder="Start Date"
            onChange={e => setStartDate(e.target.value)}
          />
          <HelpBlock>Enter start date in YYYY-MM-DD format.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}
