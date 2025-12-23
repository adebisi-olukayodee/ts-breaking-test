import path from "node:path";
import { RunScenarioFn } from "../types.js";

/**
 * Replace this placeholder with your analyzer call.
 *
 * Contract:
 * - Return *relative* paths (relative to scenario root).
 * - Sort outputs deterministically (harness will also sort, but keep it stable).
 */
export const runScenario: RunScenarioFn = async ({ scenarioRoot, beforeRoot, afterRoot, entryFile }) => {
  // Placeholder: always returns empty (so tests will fail until you wire this up).
  // Example integration idea:
  //   const result = await yourAnalyzer.analyze({
  //     baselineRoot: beforeRoot,
  //     currentRoot: afterRoot,
  //     entryFileAbs: path.join(afterRoot, entryFile),
  //   });
  //   return normalizeFromYourAnalyzer(result, scenarioRoot);

  void scenarioRoot;
  void beforeRoot;
  void afterRoot;
  void entryFile;

  return {
    breakingRuleIds: [],
    impactedSymbols: [],
    downstreamFiles: [],
    affectedTests: []
  };
};

/**
 * Helper you can use when converting absolute -> relative paths.
 */
export function rel(scenarioRoot: string, fileAbs: string) {
  return path.relative(scenarioRoot, fileAbs).replaceAll("\\", "/");
}
