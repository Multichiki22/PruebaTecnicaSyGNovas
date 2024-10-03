import React from 'react';
import { Card, Button, ListGroup, Badge, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProjectDetails = ({ project, tasks, onUpdateTaskStatus }) => {
  // Assume 'project', 'tasks', and 'onUpdateTaskStatus' are passed as props
 tasks = [
    {
      id: 1,
      name: "Diseño de la página de inicio",
      description: "Crear un diseño moderno y funcional para la página de inicio.",
      status: "pending",
      assignedUser: "Jane Doe"
    },
    {
      id: 2,
      name: "Integración con API",
      description: "Conectar el frontend con la API para mostrar datos dinámicos.",
      status: "in_progress",
      assignedUser: "John Smith"
    }
  ];

  project = {
    id: 1,
    name: "Rediseño del sitio web",
    description:
      "Actualizar el diseño y la funcionalidad del sitio web corporativo",
    startDate: "2024-10-01",
    endDate: "",
    status: "En progreso",
    assignedUser: "USER",
  }

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'in_progress':
        return <Badge bg="primary">In Progress</Badge>;
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <Card.Header as="h5">
        <Row>
          <Col>{project.name}</Col>
          <Col xs="auto">
            <Button 
              variant="outline-primary" 
              size="sm"
              as={Link} 
              to={`/edit-project/${project.id}`}
            >
              Edit Project
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Text style={{color: "WindowFrame"}}>{project.description}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Tasks</Card.Subtitle>
        <ListGroup variant="flush">
          {tasks.map(task => (
            <ListGroup.Item key={task.id}>
              <Row className="align-items-center">
                <Col xs={6}>{task.name}</Col>
                <Col xs={2}>{getStatusBadge(task.status)}</Col>
                <Col xs={4} className="text-end">
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => onUpdateTaskStatus(task.id, 'in_progress')}
                  >
                    Start
                  </Button>
                  <Button 
                    variant="outline-success" 
                    size="sm"
                    onClick={() => onUpdateTaskStatus(task.id, 'completed')}
                  >
                    Complete
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" as={Link} to={`/add-task/${project.id}`}>
          Add New Task
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ProjectDetails;