export interface User{
    pk: string
    mail: string
    password: string
    created_at: Date
    is_deleted: Boolean
    user_type: string
    created_by: Number
    access_token:  string
}
