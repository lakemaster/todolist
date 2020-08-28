import React from "react";
import { useParams } from "react-router-dom";

type TodoType = {
    id: number;
    title: string;
    completed: boolean;
  };

type TodoDetailsPropType = {
    todos: TodoType[]
  };

export default function TodoDetailsView(props:TodoDetailsPropType) {
    const todoId_str = useParams<{todoId:string}>().todoId;
    const todoId = Number(todoId_str);

    let todo = props.todos.find((todo) => todo.id === todoId);
    let id;
    let title;
    let completed;
    if ( todo === undefined ) {
        title = "not found";
    } else {
        id = todo.id;
        title = todo.title;
        completed = todo.completed;
    }

    return(
        <div>
            Id: {id} 
            <br/>
            Title: {title}
            <br/>
            Completed: {completed ? "yes" : "no"}
        </div>
    );
} 