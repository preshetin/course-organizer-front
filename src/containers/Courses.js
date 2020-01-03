import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, HelpBlock, Button } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import Applications from './Applications'
import "./Courses.css";

export default function Courses(props) {
  const [course, setCourse] = useState(null);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [courseFormMode, setCourseFormMode] = useState('view') // or 'edit'
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadCourse() {
      return API.get("courses", `/courses/${props.match.params.courseId}`);
    }
    async function onLoad() {
      try {
        const course = await loadCourse();
        const { description, startDate } = course;
        setDescription(description);
        setStartDate(startDate);
        setCourse(course);
      } catch (e) {
        alert(e);
      }
    }
    onLoad();
  }, [props.match.params.courseId]);

  function validateForm() {
    return startDate.length > 0;
  }

  function saveCourse(course) {
    return API.put("courses", `/courses/${props.match.params.courseId}`, {
      body: course
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await saveCourse({
        description,
        startDate
      });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function deleteCourse() {
    return API.del("courses", `/courses/${props.match.params.courseId}`);
  }

  async function handleDelete(event) {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmed) {
      return;
    }
    setIsDeleting(true);
    try {
      await deleteCourse();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }

  return (
    <div className="Courses">
      {course && courseFormMode === 'view' && (
        <>
          <h1>
            {course.description} &nbsp;
            <Button
              onClick={e => setCourseFormMode('edit')}
            >
              Edit
            </Button>
          </h1>
        </>
      )}
      {course && courseFormMode === 'edit' && (
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
            Save
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
          <Button
            block
            onClick={e => setCourseFormMode('view')}
          >
            Cancel
          </Button>
        </form>
      )}
      <Applications />
    </div>
  );
}