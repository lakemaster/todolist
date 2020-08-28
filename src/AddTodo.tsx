import React, { useState } from "react";

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
      }}
    >
      <input
        value={newTodo}
        onChange={(event) => setNewTitle(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
