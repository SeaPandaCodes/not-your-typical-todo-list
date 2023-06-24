import { trpc } from "@/utils/trpc";
import React from "react";

const Test: React.FC = () => {
  const rewards = trpc.availableRewards.useQuery();

  return <pre>{JSON.stringify(rewards, null, 2)}</pre>;
};

export default Test;
