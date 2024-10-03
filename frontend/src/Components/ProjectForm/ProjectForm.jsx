import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const ProjectForm = ({ onSubmit, projectInfo, usersList = [], formType }) => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(project);
  };

  useEffect(() => {
    if (projectInfo) {
      setProject(projectInfo);
    }
  }, [projectInfo]);

  return (
    <Card>
      <Card.Header as="h5">{`${formType} Project`}</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={project.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={project.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={project.endDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Responsible User</Form.Label>
            <Form.Control
              as="select"
              name="email"
              value={project.email}
              onChange={handleChange}
              required
            >
              <option value="">Select a user</option>
              {usersList.map((user) => (
                <option key={user.id} value={user.email}>
                  {user.name} ({user.email})
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
          {`${formType} Project`}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProjectForm;
