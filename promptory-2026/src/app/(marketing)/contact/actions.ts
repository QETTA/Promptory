"use server";

import { redirect } from "next/navigation";
import { contactFormSchema } from "@/lib/contact-schema";

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

  // TODO: Implement actual submission logic
  // Options:
  // 1) Send to internal Slack channel via Incoming Webhook
  // 2) Save to Supabase/Database
  // 3) Send email via Resend/AWS SES
  // 4) Create Notion page via API

  console.log("[Demo Request]", {
    teamName: parsed.data.teamName,
    contactName: parsed.data.contactName,
    email: parsed.data.email,
    teamType: parsed.data.teamType,
    companyUrl: parsed.data.companyUrl,
    painPoints: parsed.data.painPoints,
    contextNote: parsed.data.contextNote,
  });

  redirect(
    `/contact/success?team=${encodeURIComponent(parsed.data.teamName)}`
  );
}
