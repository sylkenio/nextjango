import React, { useEffect, useState } from "react";

const GRID_SPACING = 40;
const GRID_COLOR = "rgba(255,255,255,0.05)";
const LINE_COLOR = "#5BFF8D";
const NUM_SNAKES = 20;
const SNAKE_LENGTH = 10;
const SNAKE_SPEED = 0.1; // seconds per move

function getGridLines(width: number, height: number) {
  const vertical: number[] = [];
  const horizontal: number[] = [];
  for (let x = 0; x <= width; x += GRID_SPACING) vertical.push(x);
  for (let y = 0; y <= height; y += GRID_SPACING) horizontal.push(y);
  return { vertical, horizontal };
}

function randomSnakePath(width: number, height: number) {
  const cols = Math.floor(width / GRID_SPACING);
  const rows = Math.floor(height / GRID_SPACING);
  let x = Math.floor(Math.random() * cols);
  let y = Math.floor(Math.random() * rows);
  const path: { x: number; y: number }[] = [{ x, y }];
  const directions = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
  ];
  for (let i = 1; i < SNAKE_LENGTH; i++) {
    const dir = directions[Math.floor(Math.random() * directions.length)];
    x = Math.max(0, Math.min(cols - 1, x + dir.dx));
    y = Math.max(0, Math.min(rows - 1, y + dir.dy));
    path.push({ x, y });
  }
  return path;
}

export default function AnimatedGridBackground() {
  const [dimensions, setDimensions] = useState({
    width: 1920,
    height: 1080,
  });
  const [snakes, setSnakes] = useState<
    { path: { x: number; y: number }[]; idx: number }[]
  >([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setSnakes(
      Array.from({ length: NUM_SNAKES }, () => ({
        path: randomSnakePath(dimensions.width, dimensions.height),
        idx: 0,
      }))
    );
  }, [dimensions.width, dimensions.height, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setSnakes((prev) =>
        prev.map((snake) => {
          const nextIdx = (snake.idx + 1) % SNAKE_LENGTH;
          let newPath = snake.path;
          // Occasionally randomize path
          if (nextIdx === 0 && Math.random() < 0.5) {
            newPath = randomSnakePath(dimensions.width, dimensions.height);
          }
          return { path: newPath, idx: nextIdx };
        })
      );
    }, SNAKE_SPEED * 1000);
    return () => clearInterval(interval);
  }, [dimensions, mounted]);

  if (!mounted) return null;

  const { vertical, horizontal } = getGridLines(
    dimensions.width,
    dimensions.height
  );

  return (
    <div
      className="fixed inset-0 -z-10 w-full h-full"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        pointerEvents: "none",
      }}
    >
      {/* Grid lines */}
      {vertical.map((x) => (
        <div
          key={`v-${x}`}
          style={{
            position: "absolute",
            left: x,
            top: 0,
            width: 1,
            height: dimensions.height,
            background: GRID_COLOR,
          }}
        />
      ))}
      {horizontal.map((y) => (
        <div
          key={`h-${y}`}
          style={{
            position: "absolute",
            top: y,
            left: 0,
            height: 1,
            width: dimensions.width,
            background: GRID_COLOR,
          }}
        />
      ))}
      {/* Animated snakes */}
      {snakes.map((snake, i) =>
        snake.path.map((pos, j) => {
          const active = j === snake.idx;
          return (
            <div
              key={`snake-${i}-${j}`}
              style={{
                position: "absolute",
                left: pos.x * GRID_SPACING - 20,
                top: pos.y * GRID_SPACING - 20,
                width: GRID_SPACING,
                height: GRID_SPACING,
                borderRadius: "50%",
                pointerEvents: "none",
                opacity: active ? 1 : 0.5,
                transform: `scale(${active ? 0.1 : 0.05})`,
                background: active ? LINE_COLOR : "rgba(91,255,141,0.2)",
                transition: "opacity 0.3s, transform 0.3s, background 0.3s",
              }}
            />
          );
        })
      )}
    </div>
  );
}
