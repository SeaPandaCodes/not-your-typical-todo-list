import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  Select,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/utils/trpc";

const TaskCreation: React.FC = () => {
  const schema = z.object({
    name: z.string().min(1, { message: "Required" }),
    points: z.preprocess(
      (a) => parseInt(a as string) || 1,
      z.number().positive().max(100).min(10, { message: "Required" })
    ),
    // repeatTask: z.boolean(),
  });

  const requiredSchema = schema.required();

  type TaskData = {
    name: string;
    points: number;
  };

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<TaskData>({
    mode: "onBlur",
    resolver: zodResolver(requiredSchema),
  });

  const addTask = trpc.addTask.useMutation();

  // const onSubmit = handleSubmit(async (values) => {
  //   return new Promise((resolve) => {
  //     await addTask.mutateAsync({ name: values.name, points: values.points });

  //     addTask.isSuccess ? resolve(null) : console.log("fail");
  //     if (addTask.isSuccess) {
  //       console.log("HURAH!");
  //       alert(JSON.stringify(values, null, 2));
  //     }
  //     // resolve(null);
  //     // setTimeout(() => {
  //     //   alert(JSON.stringify(values, null, 2));
  //     //   resolve(null);
  //     // }, 1000);
  //   });
  // });

  const onSubmit = handleSubmit((values) => {
    return new Promise((resolve) => {
      addTask.mutateAsync({ name: values.name, points: values.points });

      setTimeout(() => {
        if (addTask.isSuccess) {
          console.log("HURAH!");

          reset({
            name: undefined,
            points: undefined,
          });
          resolve(null);
        } else {
          alert("Submission Failed");
        }
      }, 1000);
    });
  });

  // useEffect(() => {
  //   if (formState.isSubmitSuccessful) {
  //     reset({
  //       name: undefined,
  //       points: undefined,
  //     });
  //   }
  // }, [formState, reset]);

  return (
    <Box>
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <form onSubmit={onSubmit}>
            <Stack spacing="6">
              <FormControl id="name" isInvalid={!!errors.name}>
                <FormLabel>Task Name</FormLabel>
                <Input
                  autoFocus={true}
                  {...register("name")}
                  autoComplete="off"
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="points" isInvalid={!!errors.points}>
                <FormLabel>Points</FormLabel>
                <Select {...register("points")} defaultValue={""}>
                  <option hidden disabled value="">
                    Select Points
                  </option>
                  <option value={10}>Easy: 10 points</option>
                  <option value={30}>Medium: 30 points</option>
                  <option value={50}>Difficult: 50 points</option>
                </Select>
                <FormErrorMessage>{errors.points?.message}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </VStack>
      </Grid>
    </Box>
  );
};

export default TaskCreation;
