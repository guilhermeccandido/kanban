import { axiosInstance } from "@/lib/axios";
import { Todo } from "@prisma/client";
import { AxiosError } from "axios";

const todoFetchRequest = async () => {
  try {
    const result = await axiosInstance.get("/todo");
    return result.data as Promise<Todo[]>;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return [];
    }
    throw error;
  }
};

export default todoFetchRequest;
