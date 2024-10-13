import { taskApi } from "~/apis/0-task.api";
import type { CreateTask } from "~/validations/task.validation";

export const useCreateTask = () => {
  const input = ref<CreateTask>();

  const { error, execute, status } = useAsyncData(
    () => taskApi.create(input.value!),
    {
      server: false,
      immediate: false,
    },
  );

  const executeCreateTask = async (taskInput: CreateTask) => {
    input.value = taskInput;

    // execute
    await execute();
  };

  return {
    executeCreateTask,
    status,
    error,
  };
};
