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
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/utils/trpc";

const RewardCreation: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const schema = z.object({
    name: z.string().min(1, { message: "Required" }),
    points: z.preprocess(
      (a) => parseInt(a as string) || 1,
      z.number().positive().max(100).min(10, { message: "Required" })
    ),
    maxRedemptions: z.preprocess(
      (a) => parseInt(a as string) || null,
      z.number().nullable()
    ),

    // repeatTask: z.boolean(),
  });

  const checkedSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    points: z.preprocess(
      (a) => parseInt(a as string) || 1,
      z.number().positive().max(100).min(10, { message: "Required" })
    ),
    maxRedemptions: z.preprocess(
      (a) => parseInt(a as string) || null,
      z.number()
    ),

    // repeatTask: z.boolean(),
  });

  let requiredSchema: any = schema.required();

  useEffect(() => {}, [checked]);

  type RewardData = {
    name: string;
    points: number;
    maxRedemptions: number | null;
  };

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<RewardData>({
    mode: "onBlur",
    resolver: zodResolver(requiredSchema),
  });

  const addReward = trpc.addReward.useMutation();

  const onSubmit = handleSubmit((values) => {
    addReward.mutate({
      name: values.name,
      points: values.points,
      maxRedemptions: values.maxRedemptions,
    });

    console.log(addReward);

    if (addReward.isLoading !== true && addReward.isSuccess) {
      console.log("SUCCESS");
      reset({
        name: "",
        points: -1,
        maxRedemptions: null,
      });
      setChecked(false);
    } else {
      alert("Submission Failed");
    }

    // resolve(null);

    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   resolve(null);
    // }, 1000);
  });

  return (
    <Box>
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <form onSubmit={onSubmit}>
            <Stack spacing="6">
              <FormControl id="name" isInvalid={!!errors.name}>
                <FormLabel>Reward Name</FormLabel>
                <Input
                  // autoFocus={true}
                  {...register("name")}
                  autoComplete="off"
                  borderLeft={errors.name ? "solid 14px" : undefined}
                  // borderLeftColor="pink.400"
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="points" isInvalid={!!errors.points}>
                <FormLabel>Points</FormLabel>
                <Select
                  {...register("points")}
                  defaultValue={-1}
                  outline="10px"
                  borderLeft={errors.points ? "solid 14px" : undefined}
                >
                  <option hidden disabled value={-1}>
                    Select Points
                  </option>
                  <option value={10}>Easy: 10 points</option>
                  <option value={30}>Medium: 30 points</option>
                  <option value={60}>Difficult: 60 points</option>
                </Select>
                <FormErrorMessage>{errors.points?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Set Max Redemption Limit</FormLabel>
                <Checkbox
                  onChange={() => setChecked((o) => !o)}
                  id="notForm"
                  checked={checked}
                />
              </FormControl>

              <FormControl
                id="maxRedemptions"
                isInvalid={!!errors.maxRedemptions}
              >
                {checked === true && (
                  <Input
                    type="number"
                    {...register("maxRedemptions")}
                    placeholder="Enter Max Redemptions"
                    borderLeft={
                      errors.maxRedemptions ? "solid 14px" : undefined
                    }
                  />
                )}

                <FormErrorMessage>
                  {errors.maxRedemptions?.message}
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

export default RewardCreation;
