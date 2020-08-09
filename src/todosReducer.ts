type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

type AddTodoAction = {
  type: "addTodo";
  payload: string;
};

type RemoveTodoAction = {
  type: "removeTodo";
  payload: number;
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




type TodoAction = AddTodoAction | RemoveTodoAction | ToggleTodoAction | RemoveAllAction | SetTodosAction; 
let maxId = 0;

export default function todosReducer(
  state: TodoType[],
  action: TodoAction
): TodoType[] {
  switch (action.type) {
    case "addTodo":
      return [
        ...state,
        { id: ++maxId, title: action.payload, completed: false },
      ];
    case "removeTodo":
      return state.filter((td) => {
        return td.id !== action.payload;
      });
    case "toggleTodo":
      return state.map((td) => {
        if (td.id === action.payload) {
          return { ...td, completed: !td.completed };
        }
        return td;
      });
    case "removeAll":
      return [];
    case "setTodos":
      return action.payload;
  }
}
