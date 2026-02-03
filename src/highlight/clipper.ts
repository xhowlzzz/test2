import type { DemoEventStream } from "../demo/parser.js";

export interface HighlightClip {
  label: string;
  startTime: number;
  endTime: number;
  reason: string;
}

const CLIP_PADDING = 4;

export function selectHighlights(stream: DemoEventStream): HighlightClip[] {
  const clips: HighlightClip[] = [];

  for (const event of stream.events) {
    if (event.type === "kill" || event.type === "objective") {
      const startTime = Math.max(0, event.timestamp - CLIP_PADDING);
      const endTime = event.timestamp + CLIP_PADDING;
      clips.push({
        label: `${event.type.toUpperCase()} @ ${event.timestamp.toFixed(2)}s`,
        startTime,
        endTime,
        reason:
          event.type === "kill"
            ? "High-impact frag"
            : "Objective conversion"
      });
    }
  }

  return clips;
}
