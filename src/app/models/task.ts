export interface Task {
    id:string
    name: string,
    description: string,
    responsibles: string[],
    deadline_completion: Date,
    state: boolean,
    user_id:string
}

