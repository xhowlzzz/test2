import type { DemoEvent, DemoEventStream } from "../demo/parser.js";

export interface PlayerMetrics {
  kills: number;
  trades: number;
  positioningIssues: number;
  utilityImpact: number;
  objectivePlays: number;
  missedTrades: number;
  lowUtilityImpact: boolean;
  poorPositioningRate: number;
}

const UTILITY_IMPACT_THRESHOLD = 3;

function count(events: DemoEvent[], type: DemoEvent["type"]): number {
  return events.filter((event) => event.type === type).length;
}

export function computeMetrics(stream: DemoEventStream): PlayerMetrics {
  const events = stream.events.filter((event) => event.type !== "header");
  const kills = count(events, "kill");
  const trades = count(events, "trade");
  const positioningIssues = count(events, "positioning");
  const utilityImpact = count(events, "utility");
  const objectivePlays = count(events, "objective");

  const missedTrades = Math.max(0, kills - trades);
  const poorPositioningRate = events.length
    ? positioningIssues / events.length
    : 0;
  const lowUtilityImpact = utilityImpact < UTILITY_IMPACT_THRESHOLD;

  return {
    kills,
    trades,
    positioningIssues,
    utilityImpact,
    objectivePlays,
    missedTrades,
    lowUtilityImpact,
    poorPositioningRate
  };
}
