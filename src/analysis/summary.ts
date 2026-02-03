import type { PlayerMetrics } from "./metrics.js";

export interface AnalysisSummary {
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
}

export function summarizeMetrics(metrics: PlayerMetrics): AnalysisSummary {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const improvements: string[] = [];

  if (metrics.kills > metrics.trades) {
    strengths.push("Secured opening eliminations to create early advantages.");
  } else {
    strengths.push("Played for trades and team spacing.");
  }

  if (metrics.objectivePlays > 0) {
    strengths.push("Converted rounds with objective pressure.");
  } else {
    weaknesses.push("Limited objective follow-through in late rounds.");
    improvements.push("Call for executes or post-plant positioning more often.");
  }

  if (metrics.missedTrades > 2) {
    weaknesses.push("Missed trade opportunities after teammate contact.");
    improvements.push("Maintain tighter spacing and swing off teammate contact.");
  }

  if (metrics.lowUtilityImpact) {
    weaknesses.push("Utility usage had low impact.");
    improvements.push("Layer flashes and mollies to delay rotations or enable entries.");
  } else {
    strengths.push("Utility usage created timing advantages.");
  }

  if (metrics.poorPositioningRate > 0.25) {
    weaknesses.push("Positioning exposed you to off-angle punishments.");
    improvements.push("Review common off-angles and adjust pre-aim discipline.");
  } else {
    strengths.push("Positioning minimized unfavorable duels.");
  }

  return { strengths, weaknesses, improvements };
}
