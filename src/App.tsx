import React, { useReducer, useRef, useEffect } from "react";
import "./App.css";
import { Button } from "@material-ui/core";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import todosReducer from "./todosReducer";
import TodoDetailsView from "./TodoDetailsView";
import { NavLink, Route, Switch } from "react-router-dom";

type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

type ApiTodoType = {
  id: number;
  listName: string;
  todo: string;
  entryDate: string
  sequence: number
  done: boolean;
};

type ApiTodoListType = {
  todos: ApiTodoType[];
};


export default function TodoApp() {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const maxIdRef = useRef(2);

  const fetchTodos = () => {
    fetch("http://eris:8080/tdl/api/private")
      .then((responce) => responce.json())
      .then((data: ApiTodoListType) =>
        dispatch({
          type: "setTodos",
          payload: data.todos.map((apiTodo) => {
            return {
              id: apiTodo.id,
              title: apiTodo.todo,
              completed: apiTodo.done,
            };
          }),
        })
      );
  };

  useEffect(fetchTodos, []);

  let nextId = () => {
    return ++maxIdRef.current;
  };

  let toggle = (todo: TodoType) => {
    dispatch({ type: "toggleTodo", payload: todo.id });
  };

  let remove = (todo: TodoType) => {
    dispatch({ type: "removeTodo", payload: todo.id });
  };

  return (
    <div className="App">
      <NavLink to="/main">main</NavLink> <NavLink to="/about">about</NavLink>
      <h1>Todo List</h1>
      <Switch>
        <Route path="/about">About Todo</Route>
        <Route path="/main">
          <ul>
            {todos.map((todo) => (
              <TodoItem
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
                remove={() => remove(todo)}
                toggle={() => toggle(todo)}
              ></TodoItem>
            ))}
          </ul>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: "removeAll" })}
          >
            Delete All
          </Button>

          <AddTodo
            onSubmit={(newTitle) => {
              dispatch({ type: "addTodo", payload: newTitle });
            }}
          ></AddTodo>

          <br />
        </Route>
        <Route path="/details/:todoId">
          <TodoDetailsView todos={todos}></TodoDetailsView>
        </Route>
      </Switch>
    </div>
  );
}
