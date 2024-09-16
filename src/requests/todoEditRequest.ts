import { TodoEditRequest } from "@/lib/validators/todo";
import { Todo } from "@prisma/client";
import axios from "axios";

const todoEditRequest = async (payload: TodoEditRequest) => {
  try {
    const result = await axios.patch("/api/todo/edit", payload);
    return result.data as Promise<Todo[]>;
  } catch (error) {
    throw error;
  }
};

export default todoEditRequest;
