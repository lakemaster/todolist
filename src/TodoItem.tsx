import React from "react";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

type TodoItemProps = {
  id: number
  title: string;
  completed: boolean;
  remove: () => void;
  toggle: () => void;
};

let getCssClasses = (completed: boolean) => {
  let css = "TodoItem";
  if (completed) css += " Completed";
  return css;
};

export default function TodoItem(props: TodoItemProps) {
  return (
    <li className={getCssClasses(props.completed)} onClick={() => props.toggle()}>
      {props.completed ? "Done: " : "Todo: "}
      {props.title}
      <Button
        variant="contained"
        color="primary"
        onClick={(event) => {
          props.remove();
          event.stopPropagation();
        }}
      >
        Delete
      </Button>
      <NavLink to={"/details/" + props.id}>Details</NavLink>
    </li>
  );
}
