import { parseDemoFile } from "./demo/parser.js";
import { computeMetrics } from "./analysis/metrics.js";
import { summarizeMetrics } from "./analysis/summary.js";
import { selectHighlights } from "./highlight/clipper.js";

const [demoPath] = process.argv.slice(2);

if (!demoPath) {
  console.error("Usage: npm run analyze -- <path-to-demo.dem>");
  process.exit(1);
}

const stream = await parseDemoFile(demoPath);
const metrics = computeMetrics(stream);
const summary = summarizeMetrics(metrics);
const highlights = selectHighlights(stream);

console.log("Metrics:\n", metrics);
console.log("\nSummary:\n", summary);
console.log("\nHighlights:\n", highlights.slice(0, 10));
