import React, { useState } from "react";

type AddTodoProps = {
    onSubmit: (newTitel:string) => void;
}

export default function AddTodo(props:AddTodoProps) {
  const [newTitle, setNewTitle] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit(newTitle);
        setNewTitle("");
      }}
    >
      <input
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
