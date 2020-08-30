import { TodoType, ApiTodoListType } from "./TodoType";

type AddTodoAction = {
  type: "addTodo";
  payload: {
    text: string;
    setNewTodos: (data: ApiTodoListType) => void;
  };
};

type RemoveTodoAction = {
  type: "removeTodo";
  payload: {
    id: number;
    setNewTodos: (data: ApiTodoListType) => void;
  };
};

type ToggleTodoAction = {
  type: "toggleTodo";
  payload: number;
};

type RemoveAllAction = {
  type: "removeAll";
};

type SetTodosAction = {
  type: "setTodos";
  payload: TodoType[];
};

type TodoAction =
  | AddTodoAction
  | RemoveTodoAction
  | ToggleTodoAction
  | RemoveAllAction
  | SetTodosAction;

export default function todosReducer(
  state: TodoType[],
  action: TodoAction
): TodoType[] {
  switch (action.type) {
    case "addTodo":
      let maxId = 0;
      state.forEach((td: TodoType) => {
        maxId = td.id > maxId ? td.id : maxId;
      });

      fetch("http://eris:8080/tdl/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          list_name: "private",
          todo: action.payload.text,
        }),
      })
        .then((response) => response.json())
        .then((data: ApiTodoListType) => {
          console.log(data);
          action.payload.setNewTodos(data);
        });

      return [
        ...state,
        { id: ++maxId, text: action.payload.text, entry_date: "", done: false },
      ];

    case "removeTodo":
      fetch("http://eris:8080/tdl/api/private/" + action.payload.id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
        .then((response) => response.json())
        .then((data: ApiTodoListType) => {
          console.log(data);
          action.payload.setNewTodos(data);
        });

    return state.filter((td) => {
        return td.id !== action.payload.id;
      });

    case "toggleTodo":
      return state.map((td) => {
        if (td.id === action.payload) {
          return { ...td, done: !td.done };
        }
        return td;
      });

    case "removeAll":
      return [];

    case "setTodos":
      return action.payload;
  }
}
