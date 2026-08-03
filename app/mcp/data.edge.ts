// Edge McpData: one JSON import (Vite bundles it into the Worker — no fs, no glob). The bundle is
// produced by scripts/bundle-mcp.mjs from the same generated files the stdio server reads, so the
// remote endpoint and the local package never drift.
import bundle from "@/packages/mcp/data/edge-bundle.json";
import type { McpData } from "@/packages/mcp/src/tools";

export const data = bundle as unknown as McpData;
