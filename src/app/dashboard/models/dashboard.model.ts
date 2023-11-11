export interface Todos{
    id: number
    title: string
    description: string
    created_at: Date
    is_deleted: boolean
    status: string
}

export interface AddTodo{
    id: number
    title: string
}