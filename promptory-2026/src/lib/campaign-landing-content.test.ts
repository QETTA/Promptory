import assert from "node:assert/strict";
import test from "node:test";

import { resolveCampaignLandingContent } from "@/lib/campaign-landing-content";

test("campaign landing content resolves solution-oriented slugs to department CTA", () => {
  const content = resolveCampaignLandingContent("deal-desk");

  assert.equal(content.solutionSlug, "deal-desk");
  assert.equal(content.industrySlug, null);
  assert.equal(content.primaryCta.href, "/contact?type=department&slug=deal-desk&plan=department");
  assert.match(content.title, /Deal Desk/);
  assert.doesNotMatch(content.description, /입니다\.를/);
  assert.match(content.description, /이 landing은 그 흐름을 30초 안에 이해시키고/);
});

test("campaign landing content resolves mixed slugs to industry + solution context", () => {
  const content = resolveCampaignLandingContent("saas-it-access");

  assert.equal(content.solutionSlug, "it-access");
  assert.equal(content.industrySlug, "saas-it");
  assert.match(content.title, /SaaS \/ IT/);
  assert.match(content.title, /IT Access/);
  assert.equal(content.secondaryCta.href, "/industries/saas-it");
});

test("campaign landing content falls back to non-stub generic messaging", () => {
  const content = resolveCampaignLandingContent("ops-automation-launch");

  assert.equal(content.solutionSlug, null);
  assert.equal(content.industrySlug, null);
  assert.equal(content.primaryCta.href, "/contact?type=starter&plan=starter");
  assert.doesNotMatch(content.description, /stub/i);
  assert.equal(content.workflowSteps.length, 4);
});

test("campaign landing content avoids token substring false positives", () => {
  const content = resolveCampaignLandingContent("retail-ecommerce-launch");

  assert.equal(content.solutionSlug, null);
  assert.equal(content.industrySlug, "retail-ecommerce");
  assert.equal(content.primaryCta.href, "/contact?type=pilot&slug=retail-ecommerce");
});
