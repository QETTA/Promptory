import assert from "node:assert/strict";
import test from "node:test";

import { painPointOptions, teamTypeOptions } from "@/lib/contact-options";
import { teamTypeValues, workPainValues } from "@/lib/contact-schema";

test("contact intake options align with request-to-resolution team types", () => {
  assert.deepEqual(teamTypeValues, [
    "sales-ops",
    "people-ops",
    "it-ops",
    "finance-procurement",
    "other",
  ]);

  assert.deepEqual(
    teamTypeOptions.map((option) => option.value),
    teamTypeValues,
  );
});

test("contact intake pain points no longer expose legacy audit categories", () => {
  assert.deepEqual(workPainValues, [
    "deal-desk-approval",
    "access-request",
    "people-request",
    "procurement-request",
    "incident-handoff",
    "reporting-ops",
    "other",
  ]);

  assert.deepEqual(
    painPointOptions.map((option) => option.value),
    workPainValues,
  );
});
