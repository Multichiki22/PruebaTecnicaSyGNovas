import { Card, CardTitle, Container } from "react-bootstrap";
import TaskList from "../TaskList/TaskList";
import NoItems from "../NoItems/NoItems";

const MyTasks = ({ tasks=[] }) => {
  return (
    <Container className="pt-3">
      <Card>
        <CardTitle className="text-center pt-2">
          <h3>{"Your tasks"}</h3>
        </CardTitle>
        {tasks.length > 0 ? (
          <TaskList tasks={tasks} />
        ) : (
          <NoItems entity={"tasks"} />
        )}
      </Card>
    </Container>
  );
};
export default MyTasks;
