import { EducationTrackTemplate, getEducationTrackMetadata } from "@/components/marketing/education-track-template";

export const metadata = getEducationTrackMetadata("diagnostic");

export default function EducationDiagnosticPage() {
  return <EducationTrackTemplate slug="diagnostic" />;
}
