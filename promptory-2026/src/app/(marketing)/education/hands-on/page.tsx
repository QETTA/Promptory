import { EducationTrackTemplate, getEducationTrackMetadata } from "@/components/marketing/education-track-template";

export const metadata = getEducationTrackMetadata("hands-on");

export default function EducationHandsOnPage() {
  return <EducationTrackTemplate slug="hands-on" />;
}
