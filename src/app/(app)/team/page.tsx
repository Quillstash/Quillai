import { Metadata } from "next";
import { TeamsComingSoon } from "./comingsoon";

export const metadata: Metadata = {
  title: "Teams - Coming Soon | Macaw",
  description: "Collaborate with your team on content creation and management",
};

export default function TeamsPage() {
  return <TeamsComingSoon />;
}