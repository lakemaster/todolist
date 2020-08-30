import React, { useState } from "react";
import { Button } from "@material-ui/core";

type AddTodoProps = {
    onSubmit: (newTodo: string) => void;
}

export default function AddTodo(props:AddTodoProps) {
  const [newTodo, setNewTitle] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit(newTodo);
        setNewTitle("");
      }}>
      <input
        value={newTodo}
        onChange={(event) => setNewTitle(event.target.value)}
      />
      <Button variant="contained">Add</Button>
    </form>
  );
}
