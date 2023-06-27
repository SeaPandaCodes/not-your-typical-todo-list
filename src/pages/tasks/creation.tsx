import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  IconButton,
  Input,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const TaskCreation: React.FC = () => {
  const schema = z.object({
    name: z.string().min(1, { message: "Required" }),
    points: z.number().min(1, { message: "Required" }),
    repeatTask: z.boolean(),
  });

  const requiredSchema = schema.required();

  type TaskData = {
    name: string;
    points: number;
    repeatTask: boolean;
  };

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<TaskData>({
    mode: "onBlur",
    resolver: zodResolver(requiredSchema),
  });

  const onSubmit = handleSubmit((values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve(null);
      }, 1000);
    });
  });

  return (
    <Box>
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <form onSubmit={onSubmit}>
            <Stack spacing="6">
              <FormControl id="name" isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input autoFocus={true} {...register("name")} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="points" isInvalid={!!errors.points}>
                <FormLabel>Points</FormLabel>
                <NumberInput>
                  <NumberInputField {...register("points")} />
                </NumberInput>
                <FormErrorMessage>{errors.points?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="repeatTask" isInvalid={!!errors.repeatTask}>
                <FormLabel>Repeat Task</FormLabel>
                <Checkbox {...register("repeatTask")} />
                <FormErrorMessage>
                  {errors.repeatTask?.message}
                </FormErrorMessage>
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
