import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
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
          <Heading>Add Task</Heading>
          <form onSubmit={onSubmit}>
            <Stack
              spacing="10"
              transition="all 250ms ease-in-out"
              minW={{ base: "4", md: "lg", lg: "2xl" }}
              boxShadow="0 1px 3px 2px var(--chakra-colors-purple-400)"
              p="6"
              rounded="md"
              // bg="white"
            >
              <FormControl id="name" isInvalid={!!errors.name}>
                <FormLabel>Task Name</FormLabel>
                <Input
                  autoFocus={true}
                  {...register("name")}
                  autoComplete="off"
                  borderLeft={errors.name ? "solid 14px" : undefined}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="points" isInvalid={!!errors.points}>
                <FormLabel>Select Points</FormLabel>
                <Select
                  // defaultValue={"1"}
                  {...register("points")}
                  placeholder="Select Points"
                  borderLeft={errors.points ? "solid 14px" : undefined}
                >
                  <option value="10">Easy: 10 points</option>
                  <option value="30">Medium: 30 points</option>
                  <option value="60">Difficult: 60 points</option>
                </Select>
                <FormErrorMessage>{errors.points?.message}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="purple"
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
