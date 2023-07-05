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
  Box,
  Text,
  useDisclosure,
  Icon,
  keyframes,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { confetti } from "tsparticles-confetti";
import { FaDice } from "react-icons/fa";
import IMG_LOGO from "../img/FishLogo.svg";
import { Image } from "@chakra-ui/next-js";
import { redirect } from "next/navigation";

export const RewardModal: React.FC<{
  selectedRewardTier: number;
  onSelection: () => void;
}> = ({ selectedRewardTier, onSelection }) => {
  const [discarded, setDiscarded] = useState<Set<string>>(new Set());
  const [fishSpin, setFishSpin] = useState<boolean>(true);

  useEffect(() => {
    if (fishSpin === true) {
      setTimeout(() => {
        setFishSpin(false);
      }, 1020);
    }
  }, [fishSpin]);

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
      redirect("/");
    }

    const availableRewards = rewards.filter(({ id }) => !discarded.has(id));

    const index = Math.round(Math.random() * (availableRewards.length - 1));

    return [availableRewards[index], availableRewards.length] as const;
  }, [selectedRewardTier, rewardTiers.data, discarded]);

  if (randomReward === null) {
    return null;
  }

  function launchConfetti() {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
    };
    confetti({
      ...defaults,
      particleCount: 60,
      scalar: 1.2,
      shapes: ["circle", "square", "star"],
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    });

    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 3,
      shapes: ["text"],
      shapeOptions: {
        text: {
          value: ["🦈", "🐡", "🐳", "🐙", "🐠"],
        },
      },
    });
  }

  const spin = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(720deg)}
`;

  const spinAnimation = `${spin} 1s cubic-bezier(.39,.9,.34,1.01)`;

  return (
    <Modal isOpen={true} onClose={() => onSelection()} isCentered>
      <ModalOverlay />
      <ModalContent
        maxW="56rem"
        bg="orange.50"
        _dark={{
          bg: "gray.800",
        }}
      >
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Box
              bg="black"
              borderRadius={"100%"}
              animation={fishSpin ? spinAnimation : "none"}
              // transition="all 250ms ease-in-out"
            >
              <Image
                src={IMG_LOGO}
                priority={true}
                boxSize="300px"
                alt="Fish Logo"
              />
            </Box>
            <Box overflow="hidden">
              <Text
                fontSize="4xl"
                top="0"
                transform={fishSpin ? "translateY(-180%)" : "translateY(0)"}
                transition={fishSpin ? "none" : "transform 250ms ease-in-out"}
              >
                {randomReward.name}
              </Text>
            </Box>
            <Divider borderBottomWidth="3px" borderBottomColor="teal.800" />

            <Button
              isDisabled={rewardLength === 1}
              onClick={() => {
                setFishSpin(true);
                setDiscarded((d) => {
                  const newDiscarded = new Set(d);
                  newDiscarded.add(randomReward.id);

                  return newDiscarded;
                });
              }}
            >
              <Icon as={FaDice} boxSize={6} />
              &nbsp;&nbsp;Re-Roll
            </Button>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={async () => {
              console.log(fishSpin);

              await redeemRewardMutation.mutateAsync({
                rewardId: randomReward.id,
              });
              await utils.currentPoints.fetch();

              onSelection();

              // call confetti
              launchConfetti();
            }}
            isLoading={redeemRewardMutation.isLoading}
          >
            Redeem
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
