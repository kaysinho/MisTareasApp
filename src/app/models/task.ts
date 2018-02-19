export interface Task {
    id:string
    name: string,
    description: string,
    responsibles: string[],
    deadline_completion: string,
    state: boolean,
    user_id:string
}

