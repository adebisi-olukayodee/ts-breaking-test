export type ScenarioExpected = {
  scenarioId: string;
  entryFile: string; // relative to scenario root, usually src/lib/index.ts
  breakingRuleIds: string[];
  impactedSymbols: string[];
  downstreamFiles: string[];
  affectedTests: string[];
  noImpact?: boolean;
};

export type NormalizedResult = Omit<ScenarioExpected, "scenarioId" | "entryFile" | "noImpact">;

export type RunScenarioInput = {
  scenarioRoot: string;
  beforeRoot: string;
  afterRoot: string;
  entryFile: string;
};

export type RunScenarioFn = (input: RunScenarioInput) => Promise<NormalizedResult>;
