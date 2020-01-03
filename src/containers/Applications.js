import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Applications.css";

export default function Applications(props) {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { courseId } = useParams()

  useEffect(() => {
    async function onLoad() {
      try {
        const applications = await loadApplications();
        setApplications(applications);
      } catch (e) {
        alert(e);
      }
      setIsLoading(false)
    }
    onLoad();
  }, [courseId]);

  function loadApplications() {
    return API.get("courses", `/courses/${courseId}/applications`);
  }

  return (
    <div className="Home">
      <div className="applications">
        <PageHeader>Your Applications</PageHeader>
        <ListGroup>
          {!isLoading && 
            applications.map(application =>
              <LinkContainer key={application.applicationId} to={`/courses/${courseId}/applications/${application.applicationId}`}>
                <ListGroupItem header={application.firstName}>
                  {"Created: " + new Date(application.createdAt).toLocaleString()}
                </ListGroupItem>
              </LinkContainer>
            )
          }
        </ListGroup>
      </div>
    </div>
  );
  }