import React from "react";
import { Card, Container, CardTitle, Button } from "react-bootstrap";
import TaskList from "../TaskList/TaskList";
import NoItems from "../NoItems/NoItems";
import { useNavigate } from "react-router-dom";
import dateExtractor from "../../utils/dateExtractor";

const TaskByProject = ({ project, tasks, isAdmin }) => {
  const navigate = useNavigate();
  return (
    <Container className="pt-3">
      <Card>
        <CardTitle className="text-center pt-2">
          <h3>{project.name}</h3>
        </CardTitle>
        <Card.Subtitle className="px-3">{`Start date: ${dateExtractor( project.dateOfStart)}`}</Card.Subtitle>
        {tasks.length > 0 ? (
          <TaskList tasks={tasks} />
        ) : (
          <NoItems entity={"tasks"} />
        )}

        {isAdmin ? (
          <Card.Footer>
            <Button
              onClick={() => {
                navigate(`/createTask/${project.id}`);
              }}
            >
              Create Task
            </Button>
          </Card.Footer>
        ) : null}
      </Card>
    </Container>
  );
};

export default TaskByProject;
