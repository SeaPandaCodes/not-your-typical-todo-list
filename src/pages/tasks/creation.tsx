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
  const schema = z.strictObject({
    name: z.string().min(1, { message: "Required" }),
    points: z
      .string()
      .transform((s) => parseInt(s))
      .refine((s) => !Number.isNaN(s), { message: "Required" })
      .pipe(z.number().positive().max(100).min(10, { message: "Required" })),
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<z.input<typeof schema>>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      points: "",
    },
    resolver: zodResolver(schema),
  });

  const addTask = trpc.addTask.useMutation();

  const onSubmit = handleSubmit(async (values) => {
    values.points = values.points.toString();
    const parsed = schema.parse(values);
    try {
      await addTask.mutateAsync(parsed);
      reset();
    } catch {
      alert("Submission Failed");
    }
  });

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
                <FormLabel>Select Points</FormLabel>
                <Select
                  // defaultValue={"1"}
                  {...register("points")}
                  placeholder="Select Points"
                >
                  <option value="10">Easy: 10 points</option>
                  <option value="30">Medium: 30 points</option>
                  <option value="60">Difficult: 60 points</option>
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
