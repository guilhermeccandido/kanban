import Task from "./Task"
import { FC } from "react"

type TasksProps = {
    todos: string[]
}

const Tasks:FC<TasksProps> = ({todos}) => {
    return <Task></Task>
}

export default Tasks