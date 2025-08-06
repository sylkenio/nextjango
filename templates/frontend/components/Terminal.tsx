type TerminalColors = {
  ok: string;
  error: string;
};

const defaultColors: TerminalColors = {
  ok: "#5BFF8D",
  error: "#FF5B5B",
};

type TerminalProps = {
  status: string; // The message to display
  serverStatus?: string; // The actual server status for color logic
  colors?: TerminalColors;
};

function getStatusColor(serverStatus: string, colors: TerminalColors) {
  return serverStatus === "ok" ? colors.ok : colors.error;
}
export default function Terminal({
  status,
  serverStatus = "error",
  colors,
}: TerminalProps): React.ReactElement {
  const colorScheme = colors || defaultColors;
  const color = getStatusColor(serverStatus, colorScheme);
  return (
    <div className="flex flex-col items-center w-full">
      <span className="flex gap-1 items-center text-gray-400 mb-2 self-start ml-2">
        <span className="relative" style={{ color }}></span>
        <span className="relative" style={{ color }}>
          <span className="flex items-center gap-1">
            <span className="text-xl h-full w-full">{">_ "}</span>
            <span className="place-self-end">Terminal</span>
          </span>
        </span>
      </span>
      <div
        className="relative bg-[#0b2412]/11 rounded-xl px-2 py-4 text-left text-sm sm:text-base shadow-xl w-full max-w-md font-mono backdrop-blur-[2px]"
        style={{
          color,
          borderColor: color,
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <code className="whitespace-nowrap select-all">
            <span className="pointer-events-none select-none" style={{ color }}>
              $
            </span>
            <span style={{ color }}>{status}</span>
            <span
              className="animate-blink pointer-events-none select-none"
              style={{ color }}
            >
              |
            </span>
          </code>
        </div>
      </div>
    </div>
  );
}
