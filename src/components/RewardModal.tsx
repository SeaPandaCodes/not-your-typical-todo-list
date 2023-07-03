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
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particleOptions } from "./particleOptions";

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
  }, [selectedRewardTier, rewardTiers.data, discarded]);

  if (randomReward === null) {
    return null;
  }

  const particlesInit = async (main: any) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  // function shoot() {
  //   confetti({
  //     ...defaults,
  //     particleCount: 30,
  //     scalar: 1.2,
  //     shapes: ["circle", "square"],
  //     colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  //   });

  //   confetti({
  //     ...defaults,
  //     particleCount: 20,
  //     scalar: 2,
  //     shapes: ["text"],
  //     shapeOptions: {
  //       text: {
  //         value: ["🦄", "🌈"],
  //       },
  //     },
  //   });
  // }

  // setTimeout(shoot, 0);
  // setTimeout(shoot, 100);
  // setTimeout(shoot, 200);

  return (
    <Modal isOpen={true} onClose={() => onSelection()} isCentered>
      <ModalOverlay />
      <ModalContent maxW="56rem">
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <Particles
            id="particles-here"
            init={particlesInit}
            options={{
              spread: 360,
              ticks: 100,
              gravity: 0,
              decay: 0.94,
              startVelocity: 30,
              particleCount: 30,
              scalar: 1.2,
              shapes: ["circle", "square"],
              colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
            }}
          /> */}
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
