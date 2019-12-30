import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

export default function Home(props) {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      try {
        const courses = await loadCourses();
        setCourses(courses);
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [props.isAuthenticated]);
  
  function loadCourses() {
    return API.get("courses", "/courses");
  }

  function renderCoursesList(courses) {
    return [{}].concat(courses).map((course, i) =>
      i !== 0 ? (
        <LinkContainer key={course.courseId} to={`/courses/${course.courseId}`}>
          <ListGroupItem header={ course.description ? course.description.trim().split("\n")[0] : ''}>
            {"Created: " + new Date(course.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/courses/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new course
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Course Organizer</h1>
        <p>A humble helper to manage applications for the course or event.</p>
      </div>
    );
  }

  function renderCourses() {
    return (
      <div className="courses">
        <PageHeader>Your Courses</PageHeader>
        <ListGroup>
          {!isLoading && renderCoursesList(courses)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderCourses() : renderLander()}
    </div>
  );
}