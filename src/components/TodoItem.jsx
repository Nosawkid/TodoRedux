import { CircleSlash, SquareCheckBig } from "lucide-react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  deleteTodoItem,
  markItemToBeCompleted,
  updateTodoItem,
} from "../reducers/todoReducer.js";

const TodoItem = ({ todo }) => {
  const [updateItem, setUpdateItem] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState("");
  const dispatch = useDispatch();
  const deleteTodo = (id) => dispatch(deleteTodoItem(id));
  const completeTodo = (id) => dispatch(markItemToBeCompleted(id));

  const updateTodo = (event, id) => {
    event.preventDefault();
    dispatch(updateTodoItem({ id, title: updatedTodo }));
    setUpdatedTodo("");
    setUpdateItem(false);
  };

  return (
    <Card key={todo.id} className="mb-2">
      <Card.Body className="d-flex gap-2 align-items-center">
        {updateItem ? (
          <Form onSubmit={(e) => updateTodo(e, todo.id)}>
            <Form.Label>Update {todo.title} </Form.Label>
            <Form.Control
              value={updatedTodo}
              onChange={(e) => setUpdatedTodo(e.target.value)}
            />
            <Button className="d-inline-block mt-2" type="submit">
              Update Todo
            </Button>
          </Form>
        ) : (
          <>
            <Card.Title>{todo.title}</Card.Title>
            <Card.Subtitle className="text-muted">
              {todo.completed ? (
                <SquareCheckBig
                  onClick={() => completeTodo(todo.id)}
                  size={32}
                  color="green"
                />
              ) : (
                <CircleSlash
                  onClick={() => completeTodo(todo.id)}
                  size={32}
                  color="red"
                />
              )}
            </Card.Subtitle>
            <Button
              onClick={() => deleteTodo(todo.id)}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                setUpdatedTodo(todo.title);
                setUpdateItem(true);
              }}
              variant="outline-warning"
            >
              Update
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default TodoItem;
