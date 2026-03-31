import assert from "node:assert/strict";
import test from "node:test";

import { parseChannelInput } from "@/lib/channel-intake";
import { buildChannelSnapshot } from "@/lib/channel-snapshot";
import { DETERMINISTIC_ENGINE_MODE, DETERMINISTIC_ENGINE_VERSION } from "@/lib/optimization-engine/contracts";
import { resolveOptimizationEngine } from "@/lib/optimization-engine/index";
import { parseOptimizationBrief } from "@/lib/optimization-brief";

test("optimization engine resolves deterministic result with rationale and hash", () => {
  const parsed = parseChannelInput("https://smartstore.naver.com/promptory");

  assert.equal(parsed.ok, true);

  if (!parsed.ok) {
    return;
  }

  const snapshot = buildChannelSnapshot(parsed);
  const brief = parseOptimizationBrief({
    audience: "comparing",
    conversion: "purchase",
    goal: "sales",
    pain: "weak_cta",
    tone: "trustworthy",
  });
  const result = resolveOptimizationEngine({
    brief,
    parsed,
    signedIn: true,
    snapshot,
    surfaceSnapshot: null,
  });

  assert.equal(result.engineMode, DETERMINISTIC_ENGINE_MODE);
  assert.equal(result.engineVersion, DETERMINISTIC_ENGINE_VERSION);
  assert.equal(result.rationale.confidenceBand, "medium");
  assert.equal(result.recommendationPayloadHash.length, 64);
  assert.ok(result.summary.recommendedModules.length > 0);
  assert.ok(result.railPlan);
});
