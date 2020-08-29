import { TodoType } from "./TodoType"
import React from "react";
import { useParams } from "react-router-dom";

type TodoDetailsPropType = {
    todos: TodoType[]
  };

export default function TodoDetailsView(props:TodoDetailsPropType) {
    const todoId_str = useParams<{todoId:string}>().todoId;
    const todoId = Number(todoId_str);

    let todo = props.todos.find((todo) => todo.id === todoId);
    let id;
    let text;
    let entryDate;
    let completed;
    if ( todo === undefined ) {
        text = "not found";
    } else {
        id = todo.id;
        text = todo.text;
        entryDate = todo.entry_date;
        completed = todo.done;
    }

    return(
        <div>
            Id: {id} 
            <br/>
            Text: {text}
            <br/>
            Entrydate: {entryDate}
            <br/>
            Completed: {completed ? "yes" : "no"}
        </div>
    );
} 