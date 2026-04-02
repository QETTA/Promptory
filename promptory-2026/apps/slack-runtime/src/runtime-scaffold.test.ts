import assert from "node:assert/strict";
import test from "node:test";

import { sampleApprovalPayload } from "./fixtures/sample-approval-payload";
import { sampleIntakePayload } from "./fixtures/sample-intake-payload";
import { handleApprovalAction } from "./handlers/approval-action";
import { buildAppHomeSnapshot } from "./handlers/app-home";
import { handleIntakeCommand } from "./handlers/intake-command";
import { mockApprovalQueue } from "./mocks/mock-approval-queue";

test("app home counts only pending requests as open after approval completes", async () => {
  mockApprovalQueue.clear();

  await handleIntakeCommand(sampleIntakePayload);
  const receipt = await handleApprovalAction(sampleApprovalPayload);
  const home = await buildAppHomeSnapshot(sampleIntakePayload.actor);

  assert.equal(receipt.status, "completed");
  assert.equal(home.openRequests, 0);
  assert.equal(home.pendingApprovals, 0);
  assert.equal(home.cards[2]?.value, "1");
});

test("approval actions cannot execute the same request twice", async () => {
  mockApprovalQueue.clear();

  await handleIntakeCommand(sampleIntakePayload);
  await handleApprovalAction(sampleApprovalPayload);

  await assert.rejects(
    () => handleApprovalAction(sampleApprovalPayload),
    /already been approved/,
  );
});
