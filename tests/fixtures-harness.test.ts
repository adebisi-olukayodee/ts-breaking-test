import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { runScenario } from "../src/adapter/runScenario.js";
import { normalizeResult } from "../src/util/normalize.js";
import type { ScenarioExpected } from "../src/types.js";

const FIXTURES_ROOT = path.resolve("fixtures");

function listScenarioDirs(): string[] {
  return fs.readdirSync(FIXTURES_ROOT)
    .filter((name) => name.startsWith("S") && fs.statSync(path.join(FIXTURES_ROOT, name)).isDirectory())
    .sort((a, b) => a.localeCompare(b));
}

function readExpected(scenarioRoot: string): ScenarioExpected {
  const p = path.join(scenarioRoot, "expected.json");
  return JSON.parse(fs.readFileSync(p, "utf-8")) as ScenarioExpected;
}

describe("Impact analysis fixture scenarios", () => {
  const scenarios = listScenarioDirs();
  for (const scenarioName of scenarios) {
    it(scenarioName, async () => {
      const scenarioRoot = path.join(FIXTURES_ROOT, scenarioName);
      const expected = readExpected(scenarioRoot);

      const beforeRoot = path.join(scenarioRoot, "before");
      const afterRoot = path.join(scenarioRoot, "after");

      const got = await runScenario({
        scenarioRoot,
        beforeRoot,
        afterRoot,
        entryFile: expected.entryFile
      });

      const gotN = normalizeResult(got);
      const expN = normalizeResult({
        breakingRuleIds: expected.breakingRuleIds,
        impactedSymbols: expected.impactedSymbols,
        downstreamFiles: expected.downstreamFiles,
        affectedTests: expected.affectedTests
      });

      if (expected.noImpact) {
        expect(gotN.breakingRuleIds).toEqual([]);
        expect(gotN.impactedSymbols).toEqual([]);
        expect(gotN.downstreamFiles).toEqual([]);
        expect(gotN.affectedTests).toEqual([]);
        return;
      }

      expect(gotN).toEqual(expN);
    });
  }
});
