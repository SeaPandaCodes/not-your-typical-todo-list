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

  const schema = z.strictObject({
    name: z.string().min(1, { message: "Required" }),
    points: z
      .string()
      .transform((s) => (s !== null ? parseInt(s) : s))
      .refine((s) => !Number.isNaN(s), { message: "Required" })
      .pipe(z.number().positive().max(100).min(10, { message: "Required" })),
    maxRedemptions: z
      .string()
      .nullable()
      .transform((s) => parseInt(s as string) || null)
      .pipe(
        z
          .number()
          .positive()
          .max(10000)
          .min(1, { message: "Required" })
          .nullable()
      ),
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<z.input<typeof schema>>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      points: "",
      maxRedemptions: null,
    },
    resolver: zodResolver(schema),
  });

  const addReward = trpc.addReward.useMutation();

  const onSubmit = handleSubmit(async (values) => {
    values.points = values.points.toString();
    values.maxRedemptions =
      values.maxRedemptions === null ? null : values.maxRedemptions.toString();
    const parsed = schema.parse(values);
    try {
      await addReward.mutateAsync(parsed);
      reset();
      setChecked(false);
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
                  // defaultValue={'1'}
                  outline="10px"
                  borderLeft={errors.points ? "solid 14px" : undefined}
                  placeholder="Select Points"
                >
                  <option value="10">Easy: 10 points</option>
                  <option value="30">Medium: 30 points</option>
                  <option value="60">Difficult: 60 points</option>
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
