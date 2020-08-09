import React from "react";
import { BrowserRouter } from "react-router-dom";
import TodoItem from "./TodoItem";
import { render, screen } from "@testing-library/react";

it("renders a todo", () => {
  render(
    <BrowserRouter>
      <TodoItem
        id={1}
        title="my title"
        completed={false}
        remove={() => {}}
        toggle={() => {}}
      ></TodoItem>
    </BrowserRouter>
  );
});
