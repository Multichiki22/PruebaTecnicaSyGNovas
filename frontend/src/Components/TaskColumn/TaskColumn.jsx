import { useEffect, useState } from "react";
import { Accordion, Badge, Col, ListGroup, Row } from "react-bootstrap";
import EditTaskStatusButton from "../EditTaskStatusButton/EditTaskStatusButton";

const TaskColumn = ({ task }) => {
  const [taskInfo, setTaskInfo] = useState({});

  const updateTaskState = (state) => {
    setTaskInfo({ ...taskInfo, state });
  };

  useEffect(() => {
    if (task) setTaskInfo(task);
  }, [task]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDIENTE":
        return (
          <Badge bg="warning" style={{ fontWeight: "lighter" }}>
            Pending
          </Badge>
        );
      case "EN_PROGRESO":
        return (
          <Badge bg="primary" style={{ fontWeight: "lighter" }}>
            In Progress
          </Badge>
        );
      case "COMPLETADA":
        return (
          <Badge bg="success" style={{ fontWeight: "lighter" }}>
            Completed
          </Badge>
        );
      default:
        return (
          <Badge bg="secondary" style={{ fontWeight: "lighter" }}>
            Unknown
          </Badge>
        );
    }
  };

  return (
    <ListGroup.Item key={taskInfo.id}>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <Row className="align-items-center w-100">
            <Col xs={6}><h5>{taskInfo.name}</h5></Col>
            <Col xs={2}>{getStatusBadge(taskInfo.state)}</Col>
            <Col xs={4} className="text-end">
              <EditTaskStatusButton
                taskId={taskInfo.id}
                taskStatus={taskInfo.state}
                setTaskState={updateTaskState}
              />
            </Col>
          </Row>
        </Accordion.Header>
        <Accordion.Body>
          <p style={{fontSize: ".8em"}}>{taskInfo.description}</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </ListGroup.Item>
  );
};

export default TaskColumn;
