"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import { TASK_STATE_OPTIONS } from "@/lib/const";
import { throttle } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { Todo } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import { CalendarIcon, X } from "lucide-react";
import { FC, lazy, useCallback, useMemo } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { UseMutationResult } from "react-query";
import "react-quill/dist/quill.snow.css";
import CustomizedMultSelect from "./CustomizedMultSelect";
import CustomizedSelect from "./CustomizedSelect";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";

type TaskEditFormProps = {
  handleOnClose: () => void;
  task: Partial<Todo>;
  title: string;
  enableDelete?: boolean;
  deleteMutationFunctionReturn?: UseMutationResult<any, AxiosError, any, any>;
  editMutationFunctionReturn: UseMutationResult<any, AxiosError, any, any>;
  formFunctionReturn: UseFormReturn<any>;
};

const CustomizedReactQuill = lazy(() => import("./CustomizedReactQuill"));

type ErrorMessageProps = {
  msg?: string;
};

const TaskModificationForm: FC<TaskEditFormProps> = ({
  handleOnClose,
  task,
  title,
  enableDelete,
  deleteMutationFunctionReturn,
  editMutationFunctionReturn,
  formFunctionReturn,
}) => {
  const { md } = useBreakpoint();
  const { axiosToast } = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = formFunctionReturn;
  const { mutate: submitEditTodoTask, isLoading } = editMutationFunctionReturn;
  const { mutate: deleteFunc, isLoading: deleteTaskIsLoading } =
    deleteMutationFunctionReturn ?? { mutate: () => {}, isLoading: false };

  const fetchLabels = useCallback(async () => {
    try {
      const result = await axios.get("/api/todo/label");
      return result.data;
    } catch (error: any) {
      axiosToast(error);
      return [];
    }
  }, [axiosToast]);

  const ErrorMessage = ({ msg }: ErrorMessageProps) => {
    return <span className="text-red-500 text-xs">{msg}</span>;
  };

  const ExtraInfoField = () => {
    return (
      <>
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
                value={field.value}
              />
            )}
          />
          <ErrorMessage msg={errors.state?.message?.toString()} />
        </div>
        <div className="relative grid gap-1 pb-4">
          <Label className="text-xl" htmlFor="state">
            Deadline
          </Label>
          <Controller
            control={control}
            name="deadline"
            defaultValue={task.deadline}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
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
                    register={register("deadline")}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          <ErrorMessage msg={errors.deadline?.message?.toString()} />
        </div>
        <div className="relative grid gap-1 pb-4">
          <Label className="text-xl" htmlFor="state">
            Label
          </Label>
          <Controller
            control={control}
            name="label"
            render={({ field }) => (
              <CustomizedMultSelect
                value={field.value}
                onChange={field.onChange}
                placeholder="Select the label"
                lazyFetch={fetchLabels}
              />
            )}
          />
          <ErrorMessage msg={errors.label?.message?.toString()} />
        </div>
      </>
    );
  };

  return (
    <form
      onSubmit={handleSubmit((e) => {
        submitEditTodoTask(e);
      })}
    >
      <Card className="max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div>{title}</div>
            <Button variant="ghost" className="p-0 h-auto">
              <X onClick={handleOnClose} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <div className="relative grid gap-1 pb-4">
                <Label className="text-xl" htmlFor="title">
                  Title
                </Label>
                <Input
                  id="title"
                  className="w-full"
                  size={32}
                  {...register("title")}
                />
                <ErrorMessage msg={errors.title?.message?.toString()} />
              </div>
              {!md && <ExtraInfoField />}
              <div className="relative grid gap-1 pb-4">
                <Label className="text-xl" htmlFor="title">
                  Description
                </Label>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <CustomizedReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      className="h-80"
                    />
                  )}
                />
              </div>
              <div className="relative flex gap-1 pb-4">
                <Button isLoading={isLoading}>Edit Task</Button>
                {enableDelete && (
                  <Button
                    variant="outline"
                    onClick={() => deleteFunc({ id: task.id })}
                    isLoading={deleteTaskIsLoading}
                  >
                    Delete Task
                  </Button>
                )}
              </div>
            </div>
            {md && (
              <div className="w-64 flex flex-col border rounded-xl p-3 h-min">
                <ExtraInfoField />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default TaskModificationForm;
