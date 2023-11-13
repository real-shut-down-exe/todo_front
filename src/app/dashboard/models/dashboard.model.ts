export interface Todos{
    id: number
    pk: number
    title: string
    description: string
    created_at: Date
    is_deleted: boolean
    status: string
    created_by: string
}

export interface AddTodo{
    pk: number
    title: string
    is_deleted: boolean
    created_by: string
}

export interface Todo {
    title: string;
    created_by: number;
    created_at: string;
    is_deleted: boolean;
  }
  
  export interface TodoList {
    receiver: string;
    receiver_id: number;
    todos: Todo[];
  }


  export interface ConnectionRequest {
    sender: string;
    receiver: string;
    is_accepted: boolean;
    created_at: Date;
  }
  