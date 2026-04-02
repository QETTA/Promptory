import { EducationTrackTemplate, getEducationTrackMetadata } from "@/components/marketing/education-track-template";

export const metadata = getEducationTrackMetadata("team-workshop");

export default function EducationTeamWorkshopPage() {
  return <EducationTrackTemplate slug="team-workshop" />;
}
