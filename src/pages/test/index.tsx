import { trpc } from "@/utils/trpc";
import React from "react";

const Test: React.FC = () => {
  const rewards = trpc.availableRewards.useQuery();

  const testing = trpc.addTask.useMutation();

  console.log(rewards.data);

  return (
    <div>
      <pre>{JSON.stringify(rewards, null, 2)}</pre>
      {/* <div>
        {testing.isLoading ? (
          "Adding todo..."
        ) : ( */}
      <>
        {testing.isError ? (
          <div>An error occurred: {testing.error.message}</div>
        ) : null}

        {testing.isSuccess ? <div>Todo added!</div> : null}
        {console.log(rewards.data)}

        <button
          onClick={() => {
            testing.mutate({
              name: "TEST",
              points: 20,
            });
          }}
        >
          Create Todo
        </button>
      </>
      {/* )} */}
      {/* </div> */}
    </div>
  );
};

export default Test;
