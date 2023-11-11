export interface Todos{
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