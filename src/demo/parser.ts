import { readFile } from "node:fs/promises";

export type DemoEventType =
  | "header"
  | "tick"
  | "kill"
  | "trade"
  | "positioning"
  | "utility"
  | "objective";

export interface DemoEvent {
  type: DemoEventType;
  tick: number;
  timestamp: number;
  payload: Record<string, unknown>;
}

export interface DemoEventStream {
  tickRate: number;
  fileSize: number;
  events: DemoEvent[];
}

const DEFAULT_TICK_RATE = 64;
const CHUNK_SIZE = 512;

function classifyEvent(byteValue: number): DemoEventType {
  const bucket = byteValue % 20;
  if (bucket < 4) return "kill";
  if (bucket < 7) return "trade";
  if (bucket < 12) return "positioning";
  if (bucket < 16) return "utility";
  if (bucket < 19) return "objective";
  return "tick";
}

export async function parseDemoFile(path: string): Promise<DemoEventStream> {
  const buffer = await readFile(path);
  const fileSize = buffer.byteLength;
  const tickRate = DEFAULT_TICK_RATE;
  const events: DemoEvent[] = [
    {
      type: "header",
      tick: 0,
      timestamp: 0,
      payload: {
        fileSize,
        tickRate,
        note: "Heuristic parser placeholder. Use a real demo parser for production."
      }
    }
  ];

  let tick = 0;
  for (let offset = 0; offset < buffer.length; offset += CHUNK_SIZE) {
    const slice = buffer.subarray(offset, offset + CHUNK_SIZE);
    const sample = slice.length ? slice[0] : 0;
    const type = classifyEvent(sample);
    tick += 1;
    events.push({
      type,
      tick,
      timestamp: tick / tickRate,
      payload: {
        offset,
        length: slice.length,
        sample
      }
    });
  }

  return { tickRate, fileSize, events };
}
