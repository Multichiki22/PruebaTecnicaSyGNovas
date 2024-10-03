import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import TaskColumn from "../TaskColumn/TaskColumn";


const TaskList = ({  tasks }) => {
  return (
    <Card.Body>
      <Card.Subtitle className="mb-2 text-muted">Tasks</Card.Subtitle>
      <ListGroup variant="flush">
        {tasks.map((task) => (
        <TaskColumn task={task}/>
        ))}
      </ListGroup>
    </Card.Body>
  );
};
export default TaskList;
