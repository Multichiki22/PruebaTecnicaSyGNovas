import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const CreateTaskForm = ({ users = [], onSubmit, projectId }) => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    projectId,
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-3">Create new tasks</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name of the task</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={task.name}
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
                value={task.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assigned to</Form.Label>
              <Form.Control
                as="select"
                name="email"
                value={task.email}
                onChange={handleChange}
                required
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.email}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Create task
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTaskForm;
