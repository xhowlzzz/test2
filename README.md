# CS2 Demo Analyzer (Scaffold)

This project is a minimal scaffold for a Counter-Strike 2 demo analyzer. The goal is to parse `.dem` files, extract stats, summarize good/bad plays, and produce highlight-ready clip ranges.

## Goals

- Parse `.dem` demo files into a structured event stream.
- Compute player performance metrics (kills, trades, positioning, utility impact).
- Detect mistakes such as missed trades, poor positioning, or low utility impact.
- Summarize actionable feedback: what you did well, what to improve.
- Select notable moments and output clip time ranges for highlight creation.

## Requirements

- Node.js 18+
- npm

## Setup

```bash
npm install
```

## Usage

Provide a `.dem` file path to analyze:

```bash
npm run analyze -- path/to/match.dem
```

The CLI prints:

- Metrics summary
- Narrative feedback (strengths/weaknesses/improvements)
- Highlight time ranges to feed into a clipper pipeline

## Notes

This scaffold includes a heuristic parser placeholder. For production use, replace `src/demo/parser.ts` with a real CS2 demo parser (e.g., built on top of `demoinfo` bindings or a custom parser) and enrich event payloads with real game data.
