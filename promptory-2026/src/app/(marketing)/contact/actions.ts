"use server";

import { redirect } from "next/navigation";

import { contactFormSchema } from "@/lib/contact-schema";
import { trackServerEvent } from "@/lib/server/telemetry";

function readOptionalField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function submitContactRequest(formData: FormData) {
  const raw = {
    teamName: String(formData.get("teamName") ?? ""),
    contactName: String(formData.get("contactName") ?? ""),
    email: String(formData.get("email") ?? ""),
    teamType: String(formData.get("teamType") ?? ""),
    companyUrl: String(formData.get("companyUrl") ?? ""),
    painPoints: formData.getAll("painPoints").map(String),
    contextNote: String(formData.get("contextNote") ?? ""),
  };

  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "입력값을 다시 확인해 주세요.",
    };
  }

  const submissionContext = {
    inquiryType: readOptionalField(formData, "inquiryType"),
    packageSlug: readOptionalField(formData, "packageSlug"),
    planType: readOptionalField(formData, "planType"),
    companySize: readOptionalField(formData, "companySize"),
    timeline: readOptionalField(formData, "timeline"),
  };

  await trackServerEvent("contact_request_submitted", {
    inquiryType: submissionContext.inquiryType || "unknown",
    packageSlug: submissionContext.packageSlug || null,
    planType: submissionContext.planType || null,
    teamType: parsed.data.teamType,
    companySize: submissionContext.companySize || null,
    timeline: submissionContext.timeline || null,
    painPointCount: parsed.data.painPoints.length,
    hasContextNote: parsed.data.contextNote ? "true" : "false",
    hasCompanyUrl: parsed.data.companyUrl ? "true" : "false",
  });

  redirect(
    `/contact/success?team=${encodeURIComponent(parsed.data.teamName)}`
  );
}
