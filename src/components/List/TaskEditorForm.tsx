import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  TodoCreateRequest,
  TodoCreateValidator,
  TodoCheckRequest,
  TodoEditRequest,
} from "@/lib/validators/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import CustomizedSelect, { Option } from "../CustomizedSelect";
import { useMutation } from "react-query";
import { FC, memo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { TASK_STATE_OPTIONS } from "@/lib/const";
import dayjs from "dayjs";
import { TodoType } from "@/model/Todo";

type TaskCreatorFormProps = {
  handleOnSuccess: () => void;
  task: TodoType;
};

type ErrorMessageProps = {
  msg?: string;
};

const TaskCreatorForm: FC<TaskCreatorFormProps> = ({
  handleOnSuccess,
  task,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<TodoEditRequest>({
    resolver: zodResolver(TodoCreateValidator),
  });

  const { mutate: submitCreateTodoTask, isLoading } = useMutation({
    mutationFn: async ({
      title,
      description,
      state,
      dueDate,
      plannedFinishDate,
    }: TodoEditRequest) => {
      const payload = {
        id: task._id,
        title,
        state,
        description,
        dueDate,
        plannedFinishDate,
      };
      const result = await axios.patch("/api/todo/edit", payload);
      return result;
    },
    onSuccess: () => {
      handleOnSuccess();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const ErrorMessage = memo<ErrorMessageProps>(function ErrorMessage({ msg }) {
    return <span className="text-red-500 text-xs">{msg}</span>;
  });

  return (
    <form
      onSubmit={handleSubmit((e) => {
        submitCreateTodoTask(e);
      })}
    >
      <Card>
        <CardHeader>
          <CardTitle>Edit Todo Task</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative grid gap-1 pb-4">
            <Label className="text-xl" htmlFor="title">
              Title
            </Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("title")}
              defaultValue={task.title}
            />
            <ErrorMessage msg={errors.title?.message} />
          </div>
          <div className="relative grid gap-1 pb-4">
            <Label className="text-xl" htmlFor="state">
              State
            </Label>
            <Controller
              control={control}
              name="state"
              defaultValue={task.state}
              render={({ field }) => (
                <CustomizedSelect
                  options={TASK_STATE_OPTIONS}
                  placeholder="Select the state"
                  onChange={field.onChange}
                  defaultValue={task.state}
                />
              )}
            />
            <ErrorMessage msg={errors.state?.message} />
          </div>
          <div className="relative grid gap-1 pb-4">
            <Label className="text-xl" htmlFor="state">
              Deadline
            </Label>
            <Controller
              control={control}
              name="dueDate"
              defaultValue={task.dueDate}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        dayjs(field.value).format("YYYY-MM-DD")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white z-50">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        const timestamp = date ? date.getTime() : undefined;
                        field.onChange(timestamp);
                      }}
                      initialFocus
                      register={register("dueDate")}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            <ErrorMessage msg={errors.dueDate?.message} />
          </div>
          <div className="relative grid gap-1 pb-4">
            <Label className="text-xl" htmlFor="state">
              Planned Finish Date
            </Label>
            <Controller
              control={control}
              name="plannedFinishDate"
              defaultValue={task.plannedFinishDate}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        dayjs(field.value).format("YYYY-MM-DD")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white z-50">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        const timestamp = date ? date.getTime() : undefined;
                        field.onChange(timestamp);
                      }}
                      initialFocus
                      register={register("dueDate")}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>
          <ErrorMessage msg={errors.plannedFinishDate?.message} />
        </CardContent>
        <CardFooter>
          <Button isLoading={isLoading}>Edit Task</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default TaskCreatorForm;
