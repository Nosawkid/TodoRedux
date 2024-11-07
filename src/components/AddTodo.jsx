import { CirclePlus } from "lucide-react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createTodoItem } from "../reducers/todoReducer.js";

const AddTodo = () => {
  const dispatch = useDispatch();

  const addTodo = (e) => {
    e.preventDefault();
    const todo = e.target.todo.value;
    e.target.todo.value = "";
    dispatch(createTodoItem(todo));
  };

  return (
    <Container className="bg-dark text-white p-5 rounded">
      <Form onSubmit={addTodo}>
        <InputGroup className="mt-3">
          <Form.Control placeholder="Add your todos" name="todo" />
          <Button type="submit">
            <CirclePlus />
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default AddTodo;
