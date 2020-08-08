import React, { useState } from "react";
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

    function getTodo() : string {
        let todo = props.todos.find((todo) => todo.id === todoId);
        if ( todo === undefined ) {
            return "not found";
        }
        return todo.title;
    }

    return(
        <div>
            Title: {getTodo()};
        </div>
    );
} 