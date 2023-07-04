import { Box } from "@chakra-ui/react";
import { PageLayout } from "@/components/PageLayout";
import { useRef, useEffect } from "react";

export default function test() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // If the canvas element isn't rendered, return (cant do anything)
    if (!canvasRef.current) return;
    // Get the canvas element from the ref
    const canvas = canvasRef.current;
    // Access the 2d context from the canvas (3d exists, but is v complex)
    const context = canvas.getContext("2d");
    // If the context doesn't exist, return (cant do anything)
    if (!context) return;

    function resizeCanvas() {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      context!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    let isHovered = false;

    function onMouseEnter() {
      isHovered = true;
    }
    function onMouseExit() {
      isHovered = false;
    }

    canvas.addEventListener("mouseenter", onMouseEnter);
    canvas.addEventListener("mouseleave", onMouseExit);

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let i = 0;
    let lastFrame = new Date().getTime();
    let nextFrame: number | undefined = undefined;
    let hoverSpeedAdjustment = 1;
    function animate() {
      const ctx = context!;
      const now = new Date().getTime();
      i += ((now - lastFrame) / 100) * hoverSpeedAdjustment;
      if (isHovered) {
        hoverSpeedAdjustment = Math.min(10, hoverSpeedAdjustment + 0.05);
      } else {
        hoverSpeedAdjustment = Math.max(1, hoverSpeedAdjustment - 0.05);
      }
      // Clears entire canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      function drawWave(
        amplitude: number,
        frequency: number,
        offset: number,
        speed: number,
        color: string
      ) {
        const getY = (x: number) => {
          return Math.sin((x + i * speed) / frequency) * amplitude + offset;
        };

        const startingY = getY(0);
        // Starts a new line
        ctx.beginPath();
        ctx.moveTo(0, startingY);
        // Move starting cursor
        for (let x = 1; x < canvas.width; x += 4) {
          // Draws a line from the cursor to the next point
          ctx.lineTo(x, getY(x));
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      }

      // // blue
      // drawWave(20, 50, 70, 2, "rgba(0,0,255,0.8)");
      // // green
      // drawWave(20, 40, 100, 1.5, "rgba(0,255,0,0.8)");
      // // red
      // drawWave(20, 50, 160, 1, "rgba(255,0,0,0.8)");

      function drawWave2(options: {
        waves: Array<{
          amplitude: number;
          period: number;
          speed: number;
        }>;
        offset?: number;
        color: string;
      }) {
        const maxY = options.waves.reduce((a, wave) => a + wave.amplitude, 0);
        const getY = (x: number) => {
          let y = 0;
          for (const wave of options.waves) {
            y += Math.sin((x + i * wave.speed) / wave.period) * wave.amplitude;
          }
          return (
            canvas.height / window.devicePixelRatio -
            maxY +
            y -
            (options.offset ?? 0)
          );
        };

        const startingY = getY(0);
        // console.log(startingY);
        // Starts a new line
        ctx.beginPath();
        ctx.moveTo(0, startingY);
        // Move starting cursor
        for (let x = 1; x < canvas.width; x += 4) {
          // Draws a line from the cursor to the next point
          ctx.lineTo(x, getY(x));
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = options.color;
        ctx.fill();
      }

      // amplitude = wave height
      // period = distance between peaks

      // Actually draws the line
      // drawWave2({
      //   waves: [
      //     { amplitude: 20, period: 50, speed: 1 },
      //     { amplitude: 20, period: 240, speed: 4 },
      //   ],
      //   color: "rgba(0,0,255,0.6)",
      //   offset: 50,
      // });

      // drawWave2({
      //   waves: [
      //     { amplitude: 20, period: 60, speed: 1.5 },
      //     { amplitude: 20, period: 200, speed: 5 },
      //   ],
      //   color: "rgba(0,0,255,0.6)",
      //   offset: 30,
      // });

      drawWave2({
        waves: [
          { amplitude: 20, period: 50, speed: 1 },
          { amplitude: 20, period: 240, speed: 4 },
        ],
        color: "rgba(0,0,255,0.6)",
        offset: 50,
      });

      drawWave2({
        waves: [
          { amplitude: 20, period: 60, speed: 1.5 },
          { amplitude: 20, period: 200, speed: 5 },
          { amplitude: 20, period: 100, speed: 2 },
        ],
        color: "rgba(0,0,255,0.6)",
        offset: 20,
      });

      lastFrame = now;
      nextFrame = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mouseenter", onMouseEnter);
      canvas.removeEventListener("mouseleave", onMouseExit);
      if (nextFrame !== undefined) {
        cancelAnimationFrame(nextFrame);
      }
    };
  }, []);

  return (
    <PageLayout>
      <Box
        as="canvas"
        ref={canvasRef}
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        height="200px"
        width="100vw"
      />
      {/* <Box pos="fixed" right="0" left="0" bottom="0">
        <Wave />
      </Box>
      <Box
        pos="fixed"
        right="0"
        left="0"
        bottom="0"
        transform={"scaleX(-1) translateX(-100vw)"}
      >
        <Wave flipped />
      </Box> */}
    </PageLayout>
  );
}
