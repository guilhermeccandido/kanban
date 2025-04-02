import { axiosInstance } from "@/lib/axios";
import { Todo } from "@prisma/client";

const todoFetchRequest = async () => {
  try {
    const result = await axiosInstance.get("/todo");
    return result.data as Promise<Todo[]>;
  } catch (error) {
    throw error;
  }
};

export default todoFetchRequest;
