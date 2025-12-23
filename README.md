# Impact analysis fixtures + harness (Vitest)

This repo contains 10 deterministic **before/after** fixtures and a test harness that validates:

- impacted symbol(s)
- downstream files
- affected tests
- breaking rule IDs

## How it works

Each scenario is a folder under `fixtures/`:

```
fixtures/<scenario>/
  before/   (baseline workspace)
  after/    (changed workspace)
  expected.json
```

The harness (`tests/fixtures-harness.test.ts`) loads each fixture and calls `runScenario()` in `src/adapter/runScenario.ts`.

## Connect this to your analyzer

Edit **one file**:

- `src/adapter/runScenario.ts`

Replace the placeholder implementation with a call into your extension analyzer pipeline, and return:

```ts
type NormalizedResult = {
  breakingRuleIds: string[];
  impactedSymbols: string[];
  downstreamFiles: string[];
  affectedTests: string[];
};
```

Paths should be **relative to scenario root** (e.g., `src/app/consumer.ts`).

## Run

```bash
npm i
npm test
```

## Rule ID mapping used here

These are **best-effort defaults** based on your earlier rule-id scheme:

- TSAPI-EXP-001 export removed
- TSAPI-EXP-002 re-export changed
- TSAPI-FN-001  optional → required param
- TSAPI-FN-002  return type / overload changes
- TSAPI-CLS-001 class member/method removed
- TSAPI-TYP-001 optional → required property
- TSAPI-TYP-002 type narrowed

If your code uses different IDs, update `expected.json` files accordingly.
