export type TodoType = {
    id: number;
    text: string;
    entry_date: string;
    done: boolean;
};

export type ApiTodoType = {
    id: number;
    text: string;
    list_name: string;
    entry_date: string;
    sequence: number;
    done: boolean;
};

export type ApiTodoListType = {
    todos: ApiTodoType[];
};
  
  