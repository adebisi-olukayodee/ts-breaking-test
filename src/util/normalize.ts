export function sortUniq(arr: string[]) {
  return Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));
}

export function normalizeResult(r: {
  breakingRuleIds: string[];
  impactedSymbols: string[];
  downstreamFiles: string[];
  affectedTests: string[];
}) {
  return {
    breakingRuleIds: sortUniq(r.breakingRuleIds),
    impactedSymbols: sortUniq(r.impactedSymbols),
    downstreamFiles: sortUniq(r.downstreamFiles),
    affectedTests: sortUniq(r.affectedTests)
  };
}
