import assert from "node:assert/strict";
import test from "node:test";

import {
  educationTrackMap,
  industryPlaybookMap,
  legacyPackageRedirectMap,
  marketingFooterGroups,
  packageTierMap,
  packageTiers,
  solutionPackMap,
} from "@/lib/request-to-resolution-content";

test("package tiers expose only the current commercial slugs", () => {
  assert.deepEqual(
    packageTiers.map((tier) => tier.slug),
    ["starter", "department", "private", "enterprise"],
  );

  assert.equal(packageTierMap.starter.name, "Starter");
  assert.equal(packageTierMap.enterprise.name, "Enterprise");
});

test("marketing footer quick starts point only to live routes", () => {
  const quickStarts = marketingFooterGroups.find((group) => group.title === "Quick starts");
  assert.ok(quickStarts);

  for (const link of quickStarts.links) {
    if (link.href.startsWith("/packages/")) {
      const slug = link.href.replace("/packages/", "");
      assert.ok(slug in packageTierMap);
      continue;
    }

    if (link.href.startsWith("/solutions/")) {
      const slug = link.href.replace("/solutions/", "");
      assert.ok(slug in solutionPackMap);
      continue;
    }

    if (link.href.startsWith("/industries/")) {
      const slug = link.href.replace("/industries/", "");
      assert.ok(slug in industryPlaybookMap);
      continue;
    }

    if (link.href.startsWith("/education/")) {
      const slug = link.href.replace("/education/", "");
      assert.ok(slug in educationTrackMap);
      continue;
    }

    assert.fail(`Unexpected quick-start href: ${link.href}`);
  }
});

test("legacy package slugs redirect to the new product overview", () => {
  assert.deepEqual(legacyPackageRedirectMap, {
    "website-diagnosis-agent": "/packages",
    "campaign-brief-agent": "/packages",
    "korea-local-ops-agent": "/packages",
  });
});
