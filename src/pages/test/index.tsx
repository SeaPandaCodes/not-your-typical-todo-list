import { Box } from "@chakra-ui/react";
import IMG_WAVE from "../../img/LayeredWaves.svg";
import Image from "next/image";

export default function test() {
  return (
    <Box
      pos="relative"
      // h="400px"
      h="100vh"
      bgImage={`url(${IMG_WAVE})`}
      aspectRatio={960 / 300}
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
      bg="rgba(255,0,0,0.1)"
      // _before={{
      //   content: '""',
      //   bgImage: `url(${IMG_WAVE})`,
      //   bgSize: "cover",
      //   pos: "absolute",
      //   top: 0,
      //   right: 0,
      //   left: 0,
      //   bottom: 0,
      //   opacity: 0.9,
      // }}
      mt="60"
    >
      {/* <Image src={IMG_WAVE} /> */}
      TEST
    </Box>
  );
}
