import { TodoCreateRequest } from "@/lib/validators/todo";
import axios from "axios";

const todoCreateRequest = async (payload: TodoCreateRequest) => {
  try {
    const result = await axios.post("/api/todo/create", payload);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export default todoCreateRequest;
