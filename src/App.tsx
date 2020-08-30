import React, { useReducer, useEffect } from "react";
import "./App.css";
import { Button } from "@material-ui/core";
import { TodoType, ApiTodoType, ApiTodoListType } from "./TodoType";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import todosReducer from "./todosReducer";
import TodoDetailsView from "./TodoDetailsView";
import { NavLink, Route, Switch } from "react-router-dom";

export default function TodoApp() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  const fetchTodos = () => {
    fetch("http://eris:8080/tdl/api/private")
      .then((responce) => responce.json())
      .then((data: ApiTodoListType) => {
        return setTodos(data);
      });
  };

  useEffect(fetchTodos, []);

  let toggle = (todo: TodoType) => {
    dispatch({ type: "toggleTodo", payload: todo.id });
  };

  let remove = (todo: TodoType) => {
    dispatch({
      type: "removeTodo",
      payload: { id: todo.id, setNewTodos: setTodos },
    });
  };

  let setTodos = (apiTodoLost: ApiTodoListType) => {
    dispatch({
      type: "setTodos",
      payload: apiTodoLost.todos.map((todo: ApiTodoType) => {
        return {
          id: todo.id,
          text: todo.text,
          entry_date: todo.entry_date,
          done: todo.done,
        };
      }),
    });
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
                key={todo.id}
                id={todo.id}
                title={todo.text}
                completed={todo.done}
                remove={() => remove(todo)}
                toggle={() => toggle(todo)}
              ></TodoItem>
            ))}
          </ul>

          <AddTodo
            onSubmit={(newTitle) => {
              dispatch({
                type: "addTodo",
                payload: { text: newTitle, setNewTodos: setTodos },
              });
            }}
          ></AddTodo>

          <Button
            variant="contained"
            onClick={() => dispatch({ type: "removeAll" })}
          >
            Delete All
          </Button>
        </Route>
        <Route path="/details/:todoId">
          <TodoDetailsView todos={todos}></TodoDetailsView>
        </Route>
      </Switch>
    </div>
  );
}
