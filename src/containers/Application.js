
import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Application.css";
import { Link, useParams } from "react-router-dom";

function Application(props) {
  const [application, setApplication] = useState(null);
  const [form, setForm] = useState({})
  const [applicationFormMode, setApplicationFormMode] = useState('view') // or 'edit'
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { courseId, applicationId } = useParams()

  useEffect(() => {
    function loadApplication() {
      return API.get("courses", `/courses/${courseId}/applications/${applicationId}`);
    }
    async function onLoad() {
      try {
        let application = await loadApplication();
        delete application.userId
        delete application.courseId
        delete application.applicationId
        delete application.sk
        delete application.createdAt
        setForm(application)
        setApplication(application);
      } catch (e) {
        alert(e);
      }
    }
    onLoad();
  }, [courseId, applicationId]);

  function validateForm() {
    return form.email.length > 0;
  }

  function handleFieldChange(e) {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }

  function saveApplication(application) {
    return API.put("courses", `/courses/${courseId}/applications/${applicationId}`, {
      body: application
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await saveApplication(form);
      props.history.push(`/courses/${courseId}`);
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function deleteApplication() {
    return API.del("courses", `/courses/${courseId}/applications/${applicationId}`);
  }

  async function handleDelete(event) {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirmed) {
      return;
    }
    setIsDeleting(true);
    try {
      await deleteApplication();
      props.history.push(`/courses/${courseId}`);
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }

  return (
    <div className="Application">
      <div>
        <Link to={`/`} >Home</Link> /&nbsp;
        <Link to={`/courses/${courseId}`} >Applications</Link>
      </div>
      {application && applicationFormMode === 'view' && (
        <>
          <h1>
            {application.firstName} &nbsp;
            <Button
              onClick={e => setApplicationFormMode('edit')}
            >
              Edit
            </Button>
          </h1>
        </>
      )}
      {application && applicationFormMode === 'edit' && (
        <form onSubmit={handleSubmit}>
          {Object.keys(form).map(key => (
            <FormGroup controlId={key} key={key}>
              <FormControl
                value={form[key]}
                bsSize='large'
                placeholder={key}
                onChange={handleFieldChange}
              />
            </FormGroup>
          ))}
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
            onClick={e => setApplicationFormMode('view')}
          >
            Cancel
          </Button>
        </form>
      )}
    </div>
  );
}

export default Application