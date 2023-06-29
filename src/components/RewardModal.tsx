import { trpc } from "@/utils/trpc";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  Image,
  Box,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";

export const RewardModal: React.FC<{
  selectedRewardTier: number;
  onSelection: () => void;
}> = ({ selectedRewardTier, onSelection }) => {
  // TEST
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const [discarded, setDiscarded] = useState<Set<string>>(new Set());

  const utils = trpc.useContext();
  const rewardTiers = trpc.availableRewards.useQuery();
  const redeemRewardMutation = trpc.redeemReward.useMutation();

  const [randomReward, rewardLength] = useMemo(() => {
    if (rewardTiers.data === undefined) {
      return [null, 0] as const;
    }
    const rewards = rewardTiers.data.find(
      ({ points }) => points === selectedRewardTier
    )?.rewards;

    if (rewards === undefined) {
      // TO DO!!!
      throw new Error("To Do: Show state for no remaining rewards");
    }

    const availableRewards = rewards.filter(({ id }) => !discarded.has(id));

    const index = Math.round(Math.random() * (availableRewards.length - 1));

    return [availableRewards[index], availableRewards.length] as const;
  }, [rewardTiers.data, discarded]);

  if (randomReward === null) {
    return null;
  }

  console.log(rewardLength);

  return (
    <Modal isOpen={true} onClose={() => onSelection()} isCentered>
      <ModalOverlay />
      <ModalContent maxW="56rem">
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Box boxSize="md">
              <Image
                src="https://etc.usf.edu/clipart/72400/72419/72419_rey_finding_lg.gif"
                alt="Fox"
              />
            </Box>
            <Text fontSize="4xl">{randomReward.name}</Text>

            <Button
              isDisabled={rewardLength === 1}
              onClick={() =>
                setDiscarded((d) => {
                  const newDiscarded = new Set(d);
                  newDiscarded.add(randomReward.id);

                  return newDiscarded;
                })
              }
            >
              Re-Roll
            </Button>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={async () => {
              await redeemRewardMutation.mutateAsync({
                rewardId: randomReward.id,
              });
              await utils.currentPoints.fetch();

              onSelection();
            }}
            isLoading={redeemRewardMutation.isLoading}
          >
            Redeem
          </Button>
          {/* <Button variant="ghost">Secondary Action</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
